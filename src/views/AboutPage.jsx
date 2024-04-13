import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, SimpleGrid, VStack } from '../components/common/layout/index.jsx';
import { Heading, Title } from '../components/common/text/index.jsx';
import GithubCommitFeed from '../components/domain/GithubCommitFeed.jsx';

const HomePage = () => {
  return <VStack gap={2} align='flex-start' divider={<Divider />} sx={{ p: 4 }}>
    <SimpleGrid columns={{ base: 1, lg: 3, md: 3, sm: 1 }} spacing={2}>
      <Card>
        <CardHeader>
          <Heading size='lg'>
            <FontAwesomeIcon icon='vote-yea' />&nbsp;
            Vote on answers
          </Heading>
        </CardHeader>
        <CardBody>
          AnswerBrawl presents you with 2 possible answers to a question.
          Simply select one of the answers.
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
          AnswerBrawl compiles all votes and presents a ranking of all
          potential answers to a question.
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
        </CardBody>
      </Card>

    </SimpleGrid>

    <SimpleGrid columns={{ base: 1, lg: 2, md: 2, sm: 1 }} spacing={10}>
      <GithubCommitFeed />

      <VStack alignItems='flex-start' gap={4}>
        <VStack alignItems='flex-start'>
          <Title
            heading='Planned Updates'
            subheading='Short list of things that I want / need to do for this project'
          />
          <UnorderedList>
            <ListItem>Add Answers UI improvement</ListItem>
            <ListItem>Masonry question list layout?</ListItem>
            <ListItem>Backend: use Kafka or RabbitMQ for analysis (yes, overengineering for small personal project)</ListItem>
            <ListItem>Tags are not just free-text</ListItem>
            <ListItem>Search questions by tag</ListItem>
            <ListItem>Private vs Public / Listed vs Unlisted questions</ListItem>
            <ListItem>Delete questions?</ListItem>
            <ListItem>Backend: db performance</ListItem>
            <ListItem>Backend: logging</ListItem>
            <ListItem>Hosting: figure out www site prefix with SSL cert</ListItem>
          </UnorderedList>
        </VStack>

        <VStack alignItems='flex-start'>
          <Title
            heading='Tech Stack'
            subheading='Brief summary of the tech-stack for answerbrawl'
          />
          <UnorderedList>
            <ListItem>Frontend: React / Chakra-UI / js</ListItem>
            <ListItem>Backend: Node.js / express</ListItem>
            <ListItem>Authentication: Auth0</ListItem>
            <ListItem>DB:
              Postgres on Neon (questions, answers, users),
              Azure Cosmos DB (results),
              Redis (ballots)
            </ListItem>
            <ListItem>Hosting: Azure Web App, Namecheap DNS</ListItem>
          </UnorderedList>
        </VStack>
      
      </VStack>
    </SimpleGrid>
  </VStack>;
};

export default HomePage;
