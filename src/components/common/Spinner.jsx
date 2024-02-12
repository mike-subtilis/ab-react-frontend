import { Spinner as ChakraSpinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Spinner = ({ size }) => <ChakraSpinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size={size}
/>;

Spinner.propTypes = { size: PropTypes.string };
Spinner.defaultProps = { size: 'xl' };

export default Spinner;
