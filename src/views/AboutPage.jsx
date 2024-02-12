import React from 'react';
import { Box, Card, CardBody, CardHeader, Divider, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GithubCommitFeed from '../components/domain/GithubCommitFeed.jsx';

const HomePage = () => {
  return <VStack gap={2} align='flex-start' divider={<Divider />}>
    <SimpleGrid columns={3} spacing={2}>
      <Card>
        <CardHeader>
          <Heading size='lg'>
            <FontAwesomeIcon icon='vote-yea' />&nbsp;
            Vote on answers
          </Heading>
        </CardHeader>
        <CardBody>
          AnswerBrawl will (at some point) present you with 2 possible answers to a question.
          Simply select the one that answers the question best for you between the two.
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size='lg'>
            <FontAwesomeIcon icon='star' />&nbsp;
            View rankings of answers
          </Heading>
        </CardHeader>
        <CardBody>
          AnswerBrawl will (at some point) compile all votes and present a ranking of all of the answers.
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size='lg'>
            <FontAwesomeIcon icon='question' />&nbsp;
            Ask a new question
          </Heading>
        </CardHeader>
        <CardBody>
          You can ask a new question, supply it with a ton of potential answers, and then begin voting
          on those questions. You can choose to make the question public or private. You&apos;ll
          need to be signed up and logged in to ask a new question.
          (Currently you can ask a new question without answers if you sign up)
        </CardBody>
      </Card>

    </SimpleGrid>

    <SimpleGrid columns={2} spacing={10}>
      <GithubCommitFeed />

      <VStack alignItems='flex-start'>
        <Heading size='lg'>Planned Updates</Heading>
        <Box>
          <Heading size='sm' sx={{ mb: 0 }}>Frontend</Heading>
          <Text>Edit your own questions</Text>
        </Box>

        <Box>
          <Heading size='sm' sx={{ mb: 0 }}>API / Frontend</Heading>
          <Text>Add answers</Text>
        </Box>

        <Box>
          <Heading size='sm' sx={{ mb: 0 }}>API</Heading>
          <Text>Backend logging</Text>
        </Box>

        <Box>
          <Heading size='sm' sx={{ mb: 0 }}>API / Frontend</Heading>
          <Text>Voting on answers</Text>
        </Box>

      </VStack>
    </SimpleGrid>
  </VStack>;
};

export default HomePage;
