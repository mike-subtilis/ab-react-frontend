import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AnswerSimpleCard from './AnswerSimpleCard.jsx';
import Spinner from '../../common/Spinner.jsx';
import useApiConnection from '../../../utils/apiConnection';
import useDebouncedEffect from '../../../utils/useDebouncedEffect.js';

export const AnswersList = ({ questionIdFilter, tagFilter, textFilter, onError, sort, createView }) => {
  const [localError, setLocalError] = useState(null);
  const { apiGet, hasPending } = useApiConnection();
  const [answers, setAnswers] = useState([]);

  useDebouncedEffect(() => {
    onError ? onError(null) : setLocalError(null);
    const filters = {
      questionId: questionIdFilter,
      tags: tagFilter,
      text: textFilter,
      sort,
    };
    apiGet(`/answers?${new URLSearchParams(filters).toString()}`)
      .then(responseData => setAnswers(responseData || []))
      .catch(e => (onError ? onError(e.error) : setLocalError(e.error)));
  }, [questionIdFilter, tagFilter, textFilter], 250); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;
  if (answers.length === 0) return 'No answers found';
  if (localError) {
    return localError;
  }

  return <>
    {answers.map(createView)}
  </>;
};

AnswersList.propTypes = {
  questionIdFilter: PropTypes.string,
  tagFilter: PropTypes.arrayOf(PropTypes.string),
  textFilter: PropTypes.string,
  onError: PropTypes.func,
  sort: PropTypes.string,
  createView: PropTypes.func,
};

AnswersList.defaultProps = {
  questionIdFilter: '',
  tagFilter: [],
  textFilter: '',
  sort: '',
  createView: a => <AnswerSimpleCard answer={a} key={a.id} />,
};

export default AnswersList;
