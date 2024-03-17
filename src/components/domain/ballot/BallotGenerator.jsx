import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Ballot from './Ballot.jsx';
import useApiConnection from '../../../utils/apiConnection';

const BallotGenerator = ({ isActive, questionId }) => {
  const { apiPost, hasPending } = useApiConnection();
  const [ballot, setBallot] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (isActive) {
      setBallot(null);
      apiPost(`/questions/${questionId}/request-ballot`)
        .then((ballotData) => {
          setBallot(ballotData);
        })
        .catch(ex => { console.error(ex); });
    }
  }, [isActive, questionId, refreshCount]);

  function vote(answerIndex) {
    apiPost(`/questions/${questionId}/return-ballot`,
      { id: ballot.id, vote: answerIndex })
      .then(() => {
        setRefreshCount(p => p + 1);
      })
      .catch(ex => { console.error(ex); });
  }

  if (!isActive) { return null; }
  return <Ballot disabled={hasPending} ballot={ballot} onVote={vote} />;
};

BallotGenerator.propTypes = {
  isActive: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
};

BallotGenerator.defaultProps = { isActive: false };

export default BallotGenerator;
