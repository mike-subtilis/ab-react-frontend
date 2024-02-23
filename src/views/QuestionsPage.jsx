import { Grid, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import Toolbar from '../components/common/Toolbar.jsx';
import ToolbarButton from '../components/common/ToolbarButton.jsx';
import QuestionsList from '../components/domain/question/QuestionsList.jsx';
import AskQuestionDialog from '../components/domain/question/QuestionAskDialog.jsx';
import { useAuthentication } from '../components/auth/AuthenticationProvider.jsx';

const QuestionsPage = () => {
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isAuthenticated } = useAuthentication();

  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    {isAuthenticated && <Toolbar>
      <AskQuestionDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      <ToolbarButton
        text='Ask a new Question'
        colorScheme='blue'
        onClick={() => setIsAddDialogOpen(true)} />
    </Toolbar>}

    <Grid gap={2} autoFlow='row' templateColumns='repeat(3, 1fr)' sx={{ p: 4 }}>
      <QuestionsList onError={e => setError(e)} />
    </Grid>
  </VStack>;
};

export default QuestionsPage;
