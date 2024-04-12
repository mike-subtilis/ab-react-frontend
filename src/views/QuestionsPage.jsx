import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import { Button } from '../components/common/index.jsx';
import { BasicCard, Center, SimpleGrid, VStack } from '../components/common/layout/index.jsx';
import { Heading } from '../components/common/text/index.jsx';
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
            sx={{ position: 'relative', height: '100%', minHeight: '80px', width: '100%', background: '#f0f0f0' }}
            onClick={() => setIsAddDialogOpen(true)}>
            <Center style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
              <FontAwesomeIcon
                icon='question'
                style={{ opacity: 0.1, '--fa-animation-iteration-count': 6 }}
                size='4x'
                beat={true}
              />
            </Center>
            <Heading size='md'>
              Ask a new Question
            </Heading>
          </Button>
        </BasicCard>}
      <QuestionsList onError={e => setError(e)} />
    </SimpleGrid>
  </VStack>;
};

export default QuestionsPage;
