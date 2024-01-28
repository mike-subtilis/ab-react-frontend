
import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import QuestionFullView from '../components/domain/QuestionFullView.jsx';

const QuestionPage = () => {
  const params = useParams();
  const [error, setError] = useState(null);
  return <VStack align='stretch'>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    <QuestionFullView questionId={params.questionId} onError={e => setError(e)} />
  </VStack>;
};

export default QuestionPage;
