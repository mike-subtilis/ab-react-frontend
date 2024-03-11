import { Box, Divider, HStack, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCompactView from './QuestionCompactView.jsx';
import QuestionCompactResults from './QuestionCompactResults.jsx';
import ButtonIconTiny from '../../common/ButtonIconTiny.jsx';
import BallotGenerator from '../ballot/BallotGenerator.jsx';

// const { apiPut } = useApiConnection();

const QuestionExpandableCardView = ({ question, ...others }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const canExpand = question.answerIds?.length > 0;

  /* TODO:
  function addToFavorites() {
    apiPut('/users/me/add-favorites', { favoriteQuestionIds: [question.id] })
  }
  function removeFromFavorites() {
    apiPut('/users/me/remove-favorites', { favoriteQuestionIds: [question.id] })
  }
  */

  return <Box boxShadow='base' rounded='md' bg='white' sx={{ ...others.sx, p: 4 }} {...others}>
    <HStack justify='space-between' alignItems='stretch' divider={<Divider orientation='vertical' height='auto' />}>
      <VStack sx={{ flexGrow: 1 }} align='stretch' divider={<Divider />}>
        <QuestionCompactView
          question={question}
          sx={!isExpanded && canExpand ? { cursor: 'pointer' } : {}}
          onClick={!isExpanded && canExpand && (() => setIsExpanded(true))}
        />
        <BallotGenerator isActive={isExpanded} questionId={question.id} />
        <QuestionCompactResults isActive={isExpanded} questionId={question.id} />
      </VStack>
      <VStack justify='space-between'>
        <VStack sx={{ flexGrow: 0, flexShrink: 1 }}>
          <ButtonIconTiny iconKey='edit' onClick={() => navigate(`/questions/${question.id}`)} />
        </VStack>
        {isExpanded && <ButtonIconTiny iconKey='chevron-up' onClick={() => setIsExpanded(false)} />}
      </VStack>
    </HStack>
  </Box>;
};

QuestionExpandableCardView.propTypes = { question: PropTypes.object };

export default QuestionExpandableCardView;
