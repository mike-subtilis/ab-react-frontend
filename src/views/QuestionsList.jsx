import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useAuthenticatedApiConnection } from '../utils/apiConnection';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Question from '../components/domain/QuestionCompactView.jsx';

export const QuestionsList = (props) => {
  const { apiGet } = useAuthenticatedApiConnection();
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => { callGetQuestionsApi(); }, []);

  const callGetQuestionsApi = async () => {
    try {
      setError(null);
      const responseData = await apiGet('/api/questions/');
      setQuestions(responseData || []);
    } catch (error) {
      setError(error.error);
    }
  };

  return <div>
    <ReauthenticateAlert error={error} clearError={() => setError(null)} />

    <Grid gap={2} autoFlow='row' templateColumns='repeat(3, 1fr)'>
      {questions.map(q => <Question question={q} key={q.id} />)}
    </Grid>
  </div>;
};

export default withAuthenticationRequired(QuestionsList, {
  onRedirecting: () => <Spinner />,
});
