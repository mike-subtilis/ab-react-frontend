import { HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Toolbar = ({ children }) => <HStack direction='row' gap={2} alignItems='center' sx={{ backgroundColor: '#e0e0e0' }}>
  {children}
</HStack>;

Toolbar.propTypes = { children: PropTypes.any };

export default Toolbar;