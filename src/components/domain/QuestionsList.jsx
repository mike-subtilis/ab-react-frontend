import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import QuestionCompactView from './QuestionCompactView.jsx';
import Spinner from '../common/Spinner.jsx';
import { useApiConnection } from '../../utils/apiConnection.js';

export const QuestionsList = ({ onError }) => {
  const { apiGet, hasPending } = useApiConnection();
  const [questions, setQuestions] = useState([]);
  const { isAuthenticated } = useAuth0();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onError(null);
    (isAuthenticated ? apiGet('/api/questions/') : apiGet('/api/public/questions/'))
      .then(responseData => setQuestions(responseData || []))
      .catch(e => onError(e.error));
  }, []);

  if (hasPending) return <Spinner />;
  if (questions.length === 0) return 'No questions found';
  return <>
    {questions.map(q => <QuestionCompactView question={q} key={q.id} />)}
  </>;
};

export default QuestionsList;
