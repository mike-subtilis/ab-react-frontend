import { Heading, Link, Text } from '@chakra-ui/react';
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

const allComponents = {
  Heading,
  Link,
  SmallText,
  Stat,
  Text,
  Title,
};

export { Heading };
export { Link };
export { SmallText };
export { Stat };
export { Text };
export { Title };

export default allComponents;
