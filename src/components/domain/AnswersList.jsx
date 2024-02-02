import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import Spinner from '../common/Spinner.jsx';
import useApiConnection from '../../utils/apiConnection';

export const AnswersList = ({ onError }) => {
  const { apiGet, hasPending } = useApiConnection();
  const [answers, setAnswers] = useState([]);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    onError(null);
    (isAuthenticated ? apiGet('/api/answers/') : apiGet('/api/public/answers/'))
      .then(responseData => setAnswers(responseData || []))
      .catch(e => onError(e.error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;
  if (answers.length === 0) return 'No answers found';
  return <>
    {answers.map(a => <AnswerCompactView answer={a} key={a.id} />)}
  </>;
};

AnswersList.propTypes = { onError: PropTypes.func };

export default AnswersList;
