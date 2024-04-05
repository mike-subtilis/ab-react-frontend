import React, { useState } from 'react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import { Button } from '../components/common/index.jsx';
import { BasicCard, SimpleGrid, VStack } from '../components/common/layout/index.jsx';
import QuestionsList from '../components/domain/question/QuestionsList.jsx';
import QuestionAskDialog from '../components/domain/question/QuestionAskDialog.jsx';
import { useAuthentication } from '../components/auth/AuthenticationProvider.jsx';

const QuestionsPage = () => {
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isAuthenticated } = useAuthentication();

  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    {isAuthenticated &&
      <QuestionAskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />}

    <SimpleGrid columns={{ base: 1, lg: 3, md: 2, sm: 1 }} spacing={8} sx={{ p: 4 }}>
      {isAuthenticated &&
        <BasicCard sx={{ background: '#f0f0f0' }}>
          <Button
            sx={{ height: '100%', width: '100%', background: '#f0f0f0' }}
            onClick={() => setIsAddDialogOpen(true)}>
            Ask a new Question
          </Button>
        </BasicCard>}
      <QuestionsList onError={e => setError(e)} />
    </SimpleGrid>
  </VStack>;
};

export default QuestionsPage;
