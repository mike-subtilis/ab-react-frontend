import PropTypes from 'prop-types';
import React from 'react';
import HStack from './layout/HStack.jsx';

const Toolbar = ({ children }) => <HStack direction='row' gap={2} alignItems='center' sx={{ backgroundColor: '#e0e0e0', p: 2 }}>
  {children}
</HStack>;

Toolbar.propTypes = { children: PropTypes.any };

export default Toolbar;
