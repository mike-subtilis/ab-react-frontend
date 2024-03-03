import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return <Alert status='error'>
    <AlertIcon />
    <AlertDescription>
      {error.message}
    </AlertDescription>
  </Alert>;
};

ErrorAlert.propTypes = { error: PropTypes.object };

export default ErrorAlert;
