import { useAuth0 } from '@auth0/auth0-react';
import {
  Alert, AlertIcon, AlertDescription,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

const ReauthenticateAlert = ({ error, clearError }) => {
  const {
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();
  const [reAuthError, setReAuthError] = useState(null);
  const cancelRef = useRef();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      clearError();
    } catch (newError) {
      setReAuthError(newError.error);
    }
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      clearError();
    } catch (newError) {
      setReAuthError(newError.error);
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return <>
    <AlertDialog
      isOpen={!!reAuthError}
      leastDestructiveRef={cancelRef}
      onClose={() => setReAuthError(null)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Re-Authentication Error
          </AlertDialogHeader>

          <AlertDialogBody>
            {reAuthError}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setReAuthError(null)}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>

    {error === 'consent_required' && <Alert status='warning'>
      <AlertIcon />
      <AlertDescription>
        You need to&nbsp;
        <a
          href='#/'
          className='alert-link'
          onClick={e => handle(e, handleConsent)}
        >
          consent to get access to users api
        </a>
      </AlertDescription>
    </Alert>}

    {error === 'login_required' && <Alert status='warning'>
      <AlertIcon />
      <AlertDescription>
        You need to&nbsp;
        <a
          href='#/'
          className='alert-link'
          onClick={e => handle(e, handleLoginAgain)}
        >
          log in again
        </a>
      </AlertDescription>
    </Alert>}
  </>;
};

ReauthenticateAlert.propTypes = { error: PropTypes.object, clearError: PropTypes.func };

export default ReauthenticateAlert;
