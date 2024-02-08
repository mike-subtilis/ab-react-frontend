import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';

const HomePage = () => {
  return <VStack gap={2}>
    <Heading as='h1' size='3xl' noOfLines={1}>
      Welcome to AnswerBrawl
    </Heading>

    <Text>
      Still need to decide what to put here.
      In the mean time, feel free to sign up and log in and ask questions (but no answers yet).
      Or check out the About Page with recent updates from github.
    </Text>
  </VStack>;
};

export default HomePage;
