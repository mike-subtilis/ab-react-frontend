import React, { useState } from 'react';
import {
  Card, CardBody, CardHeader, CardFooter, Heading, HStack, Text, VStack, 
} from '@chakra-ui/react';

const HomePage = () => {
  return <VStack gap={2}>
    <Heading as='h1' size='3xl' noOfLines={1}>
      Welcome to AnswerBrawl
    </Heading>

    <Text>Things you can (or can't yet but someday) do...</Text>

    <HStack>
      <Card>
        <CardHeader>
          <Heading size='lg'>Vote on answers</Heading>
        </CardHeader>
        <CardBody>
          AnswerBrawl will (at some point) present you with 2 possible answers to a question.
          Simply select the one that answers the question best for you between the two.
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size='lg'>View rankings of answers</Heading>
        </CardHeader>
        <CardBody>
          AnswerBrawl will (at some point) compile all votes and present a ranking of all of the answers.
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size='lg'>Ask a new question</Heading>
        </CardHeader>
        <CardBody>
          You can ask a new question, supply it with a ton of potential answers, and then begin voting
          on those questions. You can choose to make the question public or private.
        </CardBody>
      </Card>

    </HStack>
  </VStack>;
};

export default HomePage;
