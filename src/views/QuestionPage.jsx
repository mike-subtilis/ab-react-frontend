import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Toolbar from '../components/common/Toolbar.jsx';
import QuestionFullView from '../components/domain/QuestionFullView.jsx';
import useApiConnection from '../utils/apiConnection';

const QuestionPage = () => {
  const params = useParams();
  const [error, setError] = useState(null);

  const { apiGet, hasPending } = useApiConnection();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    setError(null);
    apiGet(`/questions/${params.questionId}`)
      .then(responseData => setQuestion(responseData || null))
      .catch(e => setError(e.error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;

  return <VStack align='stretch'>
    <Toolbar>
    </Toolbar>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />
    <QuestionFullView question={question} />
  </VStack>;
};

export default QuestionPage;
