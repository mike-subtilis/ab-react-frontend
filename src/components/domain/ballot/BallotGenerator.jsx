import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useApiConnection from '../../../utils/apiConnection';

const BallotGenerator = ({ isActive, questionId }) => {
  const { apiGet } = useApiConnection();
  const [ballot, setBallot] = useState(null);

  useEffect(() => {
    if (isActive) {
      apiGet(`/questions/${questionId}/get-ballot`)
        .then((ballotData) => {
          setBallot(ballotData);
        })
        .catch(ex => { console.error(ex); });
    }
  }, [isActive, questionId]);

  if (!isActive) { return null; }
  return <span>{JSON.stringify(ballot)}</span>;
};

BallotGenerator.propTypes = {
  isActive: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
};

BallotGenerator.defaultProps = { isActive: false };

export default BallotGenerator;
