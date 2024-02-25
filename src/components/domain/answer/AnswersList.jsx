import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import Spinner from '../../common/Spinner.jsx';
import useApiConnection from '../../../utils/apiConnection';
import useDebouncedEffect from '../../../utils/useDebouncedEffect.js';

export const AnswersList = ({ questionIdFilter, tagFilter, textFilter, onError }) => {
  const [localError, setLocalError] = useState(null);
  const { apiGet, hasPending } = useApiConnection();
  const [answers, setAnswers] = useState([]);

  useDebouncedEffect(() => {
    onError ? onError(null) : setLocalError(null);
    const filters = {
      questionId: questionIdFilter,
      tags: tagFilter,
      text: textFilter,
    };
    apiGet(`/answers?${new URLSearchParams(filters).toString()}`)
      .then(responseData => setAnswers(responseData || []))
      .catch(e => (onError ? onError(e.error) : setLocalError(e.error)));
  }, [questionIdFilter, tagFilter, textFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;
  if (answers.length === 0) return 'No answers found';
  if (localError) {
    return localError;
  }

  return <>
    {answers.map(a => <AnswerCompactView answer={a} key={a.id} />)}
  </>;
};

AnswersList.propTypes = {
  questionIdFilter: PropTypes.arrayOf(PropTypes.string),
  tagFilter: PropTypes.arrayOf(PropTypes.string),
  textFilter: PropTypes.string,
  onError: PropTypes.func,
};

AnswersList.defaultProps = {
  questionIdFilter: '',
  tagFilter: [],
  textFilter: '',
};

export default AnswersList;
