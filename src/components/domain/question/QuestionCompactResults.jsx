import PropTypes from 'prop-types';
import React from 'react';
import BarChart from '../../charts/BarChart.jsx';

const QuestionCompactResults = ({ isActive, questionId }) => {
  console.log(`${questionId} results...`);
  if (!isActive) { return null; }
  return <BarChart items={[{ name: 'Frog', value: 3 }, { name: 'Spider', value: 5 }, { name: 'Dog', value: 75 }, { name: 'Cat', value: 53 }]} />
};

QuestionCompactResults.propTypes = {
  isActive: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
};

QuestionCompactResults.defaultProps = { isActive: false };

export default QuestionCompactResults;
