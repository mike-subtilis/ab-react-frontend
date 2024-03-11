import React from 'react';
import { VStack } from '../components/common/layout/index.jsx'
import { Heading, Text } from '../components/common/text/index.jsx';

const HomePage = () => {
  return <VStack gap={2} sx={{ p: 4 }}>
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
