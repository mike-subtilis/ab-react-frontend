import { Heading, Link, Text, Textarea as ChakraTextArea } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Stat from './Stat.jsx';
import Title from './Title.jsx';

const SmallText = ({ validation, children }) => {
  return <Text fontSize='xs' sx={{ color: validation ? 'red' : 'gray', mb: 0 }}>
    {children}
  </Text>;
};
SmallText.propTypes = { validation: PropTypes.bool, children: PropTypes.any };

const TextArea = ({ ...others }) => {
  return <ChakraTextArea resize='none' {...others} />;
}

const allComponents = {
  Heading,
  Link,
  SmallText,
  Stat,
  Text,
  TextArea,
  Title,
};

export { Heading };
export { Link };
export { SmallText };
export { Stat };
export { Text };
export { TextArea };
export { Title };

export default allComponents;
