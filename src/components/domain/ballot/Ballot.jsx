import PropTypes from 'prop-types';
import React from 'react';
import AnswerCompactView from '../answer/AnswerCompactView.jsx';
import { Button } from '../../common/index.jsx';
import { HStack } from '../../common/layout/index.jsx';
import { Text } from '../../common/text/index.jsx';

const Ballot = ({ ballot, onVote }) => {
  if (!ballot || !ballot.answers) return null;

  return <HStack gap={2} alignItems='center'>
    <Button size='sm' onClick={() => onVote(0)}>
      <AnswerCompactView answer={ballot.answers[0]} />
    </Button>
    <Text fontSize='sm' as='b'>vs</Text>
    <Button size='sm' onClick={() => onVote(1)}>
      <AnswerCompactView answer={ballot.answers[1]} />
    </Button>
  </HStack>;
};

Ballot.propTypes = {
  ballot: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired, // (0) or (1)
};

export default Ballot;
