import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import Spinner from '../../common/Spinner.jsx';
import useApiConnection from '../../../utils/apiConnection';

export const AnswersList = ({ onError }) => {
  const { apiGet, hasPending } = useApiConnection();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    onError(null);
    apiGet('/answers')
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
