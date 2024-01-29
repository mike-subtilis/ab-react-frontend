import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import Spinner from '../common/Spinner.jsx';
import { useApiConnection } from '../../utils/apiConnection.js';

export const AnswersList = ({ onError }) => {
  const { apiGet, hasPending } = useApiConnection();
  const [answers, setAnswers] = useState([]);
  const { isAuthenticated } = useAuth0();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onError(null);
    (isAuthenticated ? apiGet('/api/answers/') : apiGet('/api/public/answers/'))
      .then(responseData => setAnswers(responseData || []))
      .catch(e => onError(e.error));
  }, []);

  if (hasPending) return <Spinner />;
  if (answers.length === 0) return 'No answers found';
  return <>
    {answers.map(a => <AnswerCompactView answer={a} key={a.id} />)}
  </>;
};

export default AnswersList;
