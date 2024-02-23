import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const ToolbarButton = ({ iconKey, text, ...others }) => {
  return <Button
    size='sm'
    leftIcon={iconKey && <FontAwesomeIcon icon={iconKey} />}
    {...others}
  >
    {text}
  </Button>;
};

ToolbarButton.propTypes = {
  iconKey: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default ToolbarButton;
