
import React, { useState } from 'react';
import { Grid, VStack } from '@chakra-ui/react';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import AnswersList from '../components/domain/answer/AnswersList.jsx';

const AnswersPage = () => {
  const [error, setError] = useState(null);

  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />

    <Grid gap={2} autoFlow='row' templateColumns='repeat(3, 1fr)'>
      <AnswersList onError={e => setError(e)} />
    </Grid>
  </VStack>;
};

export default AnswersPage;
