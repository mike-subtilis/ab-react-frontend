import { Heading, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Title = ({ heading, subheading }) => {
  return <VStack alignItems='flex-start' gap={0} sx={{ mb: 2 }}>
    <Heading size='lg' sx={{ p: 0, m: 0 }}>{heading}</Heading>
    <small style={{ color: '#404040' }}>{subheading}</small>
  </VStack>;
};

Title.propTypes = {
  heading: PropTypes.any,
  subheading: PropTypes.any,
};

export default Title;
