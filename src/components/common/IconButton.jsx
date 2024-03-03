import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const IconButton = ({ iconKey, text, ...others }) => {
  return <ChakraIconButton
    colorScheme='blue'
    aria-label={text}
    icon={<FontAwesomeIcon icon={iconKey} />}
    {...others}
  />;
};

IconButton.propTypes = {
  iconKey: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default IconButton;
