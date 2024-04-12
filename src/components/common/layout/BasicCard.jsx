import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const BasicCard = ({ children, sx, ...others }) => {
  return <Box boxShadow='base' rounded='md' bg='white' sx={{ ...sx, p: 4 }} {...others}>
    {children}
  </Box>;
};

BasicCard.propTypes = { children: PropTypes.any, sx: PropTypes.object };

export default BasicCard;
