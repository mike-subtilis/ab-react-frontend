import React, { useEffect, useState } from 'react';
import QuestionCompactView from './QuestionCompactView.jsx';
import Spinner from '../common/Spinner.jsx';
import { useAuthenticatedApiConnection } from '../../utils/apiConnection.js';

export const QuestionsList = ({ onError }) => {
  const { apiGet, hasPending } = useAuthenticatedApiConnection();
  const [questions, setQuestions] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onError(null);
    apiGet('/api/questions/')
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
