
import React, { useState } from 'react';
import {
  Button, Grid, HStack, VStack,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import QuestionsList from '../components/domain/QuestionsList.jsx';
import AskQuestionDialog from '../components/domain/AskQuestionDialog.jsx';

const QuestionsPage = () => {
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

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
