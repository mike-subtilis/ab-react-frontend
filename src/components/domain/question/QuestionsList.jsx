import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import QuestionExpandableCardView from './QuestionExpandableCardView.jsx';
import Spinner from '../../common/Spinner.jsx';
import useApiConnection from '../../../utils/apiConnection.js';

export const QuestionsList = ({ onError }) => {
  const { apiGet, hasPending } = useApiConnection();
  const [questions, setQuestions] = useState([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onError(null);
    apiGet('/questions')
      .then(responseData => setQuestions(responseData || []))
      .catch(e => onError(e.error));
  }, []);

  if (hasPending) return <Spinner />;
  if (questions.length === 0) return 'No questions found';
  return <>
    {questions.map(q => <QuestionExpandableCardView question={q} key={q.id} />)}
  </>;
};

QuestionsList.propTypes = { onError: PropTypes.func };

export default QuestionsList;
