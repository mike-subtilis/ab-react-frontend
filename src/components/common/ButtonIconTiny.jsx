import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const ButtonIconTiny = ({ iconKey, text, ...others }) => {
  return <ChakraIconButton
    aria-label={text}
    icon={<FontAwesomeIcon icon={iconKey} />}
    size='xs'
    isRound
    sx={{ color: '#8080a0', ...others.sx }}
    {...others}
  />;
};

ButtonIconTiny.propTypes = {
  iconKey: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default ButtonIconTiny;
