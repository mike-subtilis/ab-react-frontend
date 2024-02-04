
import React, { useState } from 'react';
import {
  Button, Grid, HStack, VStack,
} from '@chakra-ui/react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import QuestionsList from '../components/domain/QuestionsList.jsx';
import AskQuestionDialog from '../components/domain/AskQuestionDialog.jsx';
import { useAuthentication } from '../components/auth/AuthenticationProvider.jsx';

const QuestionsPage = () => {
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isAuthenticated } = useAuthentication();

  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    {isAuthenticated && <>
      <AskQuestionDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      <HStack justify='flex-start'>
        <Button colorScheme='blue' onClick={() => setIsAddDialogOpen(true)}>
          Ask a new Question
        </Button>
      </HStack>
    </>}

    <Grid gap={2} autoFlow='row' templateColumns='repeat(3, 1fr)'>
      <QuestionsList onError={e => setError(e)} />
    </Grid>
  </VStack>;
};

export default QuestionsPage;
