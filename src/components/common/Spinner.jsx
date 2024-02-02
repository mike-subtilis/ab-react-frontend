import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import React from 'react';

const Spinner = () => <ChakraSpinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>;

export default Spinner;
