import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart.jsx';
import useApiConnection from '../../../utils/apiConnection';

const QuestionCompactResults = ({ isActive, questionId }) => {
  const { apiGet } = useApiConnection();
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (isActive) {
      apiGet(`/questions/${questionId}/results`)
        .then((resultsData) => {
          setResults(resultsData);
        })
        .catch(ex => { console.error(ex); });
    }
  }, [isActive, questionId]);

  if (!isActive) { return null; }
  const defaultResults = [{ name: 'Frog', value: 3 }, { name: 'Spider', value: 5 }, { name: 'Dog', value: 75 }, { name: 'Cat', value: 53 }];
  return <BarChart items={results || defaultResults} />
};

QuestionCompactResults.propTypes = {
  isActive: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
};

QuestionCompactResults.defaultProps = { isActive: false };

export default QuestionCompactResults;
