import { Alert, AlertDescription, AlertIcon, Box, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { sortBy } from 'lodash';
import Title from '../common/Title.jsx';
import { formatDateTimeFriendly } from '../../utils/dateUtils';

const maxCount = 10;
const apiGitRepo = 'ab-api';
const frontendGitRepo = 'ab-react-frontend';
const getGithubFeedUrl = gitRepo => `https://api.github.com/repos/mike-subtilis/${gitRepo}/commits?per_page=${maxCount}`;
const apiUrl = getGithubFeedUrl(apiGitRepo);
const frontendUrl = getGithubFeedUrl(frontendGitRepo);

async function fetchCommitsFeed(url, otherFields) {  
  const response = await fetch(url);
  const responseData = await response.json();
  const commits = responseData.map(rd => rd.commit);
  const simpleCommits = commits.map(c => ({
    date: c.author.date || c.committer.date,
    message: c.message,
    ...otherFields,
  }));
  return simpleCommits;
}

const GithubCommitFeed = () => {
  const [apiEntries, setApiEntries] = useState([]);
  const [frontendEntries, setFrontendEntries] = useState([]);
  const [combinedEntries, setCombinedEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommitsFeed(apiUrl, { source: 'API' })
      .then(commits => setApiEntries(commits))
      .catch(ex => setError(ex));
    fetchCommitsFeed(frontendUrl, { source: 'Frontend' })
      .then(commits => setFrontendEntries(commits))
      .catch(ex => setError(ex));
  }, []);

  useEffect(() => {
    const newCombinedEntries = sortBy([
      ...apiEntries,
      ...frontendEntries,
    ], e => -(new Date(e.date).valueOf()));
    setCombinedEntries(newCombinedEntries.slice(0, 10));
  }, [apiEntries, frontendEntries]);

  if (error) {
    return <Alert status='error'>
      <AlertIcon />
      <AlertDescription>
        {error.message}
      </AlertDescription>
    </Alert>;
  }

  return <VStack alignItems='flex-start'>
    <Title
      heading='Recent Updates'
      subheading={<>
        Real-time feeds from Github:&nbsp;
        <Link href='https://github.com/mike-subtilis/ab-react-frontend' isExternal>Frontend</Link>
        &nbsp;&&nbsp;
        <Link href='https://github.com/mike-subtilis/ab-api' isExternal>Backend</Link>
      </>}
    />

    {combinedEntries.map(c => <Box key={c.date}>
      <HStack alignItems='baseline'>
        <Heading size='sm' sx={{ mb: 0 }}>{c.source}</Heading>
        <Text fontSize='xs' sx={{ mb: 0 }}>{formatDateTimeFriendly(c.date)}</Text>
      </HStack>
      <Text>{c.message}</Text>
    </Box>)}
  </VStack>;
};

export default GithubCommitFeed;
