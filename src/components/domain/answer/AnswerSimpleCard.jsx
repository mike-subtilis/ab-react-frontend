import PropTypes from 'prop-types';
import React from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import { Box, HStack } from '../../common/layout/index.jsx';

const AnswerSimpleCard = ({ answer, ...others }) => {
  return <Box boxShadow='base' p='4' rounded='md' bg='white' {...others}>
    <HStack justify='space-between' align='stretch'>
      <AnswerCompactView answer={answer} />
    </HStack>
  </Box>;
};

AnswerSimpleCard.propTypes = { answer: PropTypes.object };

export default AnswerSimpleCard;
