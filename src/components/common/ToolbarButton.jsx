import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const ToolbarButton = ({ iconKey, text, isDisabled, isInProgress, ...others }) => {
  let icon = iconKey;
  let spinPulse = false;
  if (isInProgress) {
    icon = 'spinner';
    spinPulse = true;
  } 
  return <Button
    isDisabled={isDisabled}
    size='sm'
    leftIcon={icon && <FontAwesomeIcon icon={icon} spinPulse={spinPulse} />}
    {...others}
  >
    {text}
  </Button>;
};

ToolbarButton.propTypes = {
  iconKey: PropTypes.string,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isInProgress: PropTypes.bool,
};

export default ToolbarButton;
