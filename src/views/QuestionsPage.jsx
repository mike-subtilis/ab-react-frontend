import { SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import Toolbar from '../components/common/Toolbar.jsx';
import ToolbarButton from '../components/common/ToolbarButton.jsx';
import QuestionsList from '../components/domain/question/QuestionsList.jsx';
import QuestionAskDialog from '../components/domain/question/QuestionAskDialog.jsx';
import { useAuthentication } from '../components/auth/AuthenticationProvider.jsx';

const QuestionsPage = () => {
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isAuthenticated } = useAuthentication();

  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    {isAuthenticated && <Toolbar>
      <QuestionAskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      <ToolbarButton
        text='Ask a new Question'
        colorScheme='blue'
        onClick={() => setIsAddDialogOpen(true)} />
    </Toolbar>}

    <SimpleGrid columns={{ base: 1, lg: 3, md: 2, sm: 1 }} spacing={8} sx={{ p: 4 }}>
      <QuestionsList onError={e => setError(e)} />
    </SimpleGrid>
  </VStack>;
};

export default QuestionsPage;
