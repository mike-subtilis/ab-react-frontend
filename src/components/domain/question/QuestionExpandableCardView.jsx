import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCompactView from './QuestionCompactView.jsx';
import QuestionCompactResults from './QuestionCompactResults.jsx';
import { ButtonIconTiny } from '../../common/index.jsx';
import { BasicCard, Divider, HStack, VStack } from '../../common/layout/index.jsx';
import BallotGenerator from '../ballot/BallotGenerator.jsx';

const QuestionExpandableCardView = ({ question, isInteractive, ...others }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const canExpand = isInteractive && question.isVotingOpen;

  /* TODO:
  function addToFavorites() {
    apiPut('/users/me/add-favorites', { favoriteQuestionIds: [question.id] })
  }
  function removeFromFavorites() {
    apiPut('/users/me/remove-favorites', { favoriteQuestionIds: [question.id] })
  }
  */

  return <BasicCard sx={others.sx} {...others}>
    <HStack justify='space-between' alignItems='stretch' divider={<Divider orientation='vertical' height='auto' />}>
      <VStack sx={{ flexGrow: 1 }} alignItems='stretch' divider={isExpanded && <Divider />}>
        <QuestionCompactView
          question={question}
          sx={!isExpanded && canExpand ? { cursor: 'pointer' } : {}}
          onClick={(!isExpanded && canExpand) ? (() => setIsExpanded(true)) : undefined}
        />
        <BallotGenerator isActive={isExpanded} questionId={question.id} />
        <QuestionCompactResults isActive={isExpanded} questionId={question.id} />
      </VStack>
      {isInteractive && <VStack justify='space-between'>
        <VStack sx={{ flexGrow: 0, flexShrink: 1 }}>
          <ButtonIconTiny iconKey='search' onClick={() => navigate(`/questions/${question.id}`)} />
        </VStack>
        {canExpand && <ButtonIconTiny
          iconKey={isExpanded ? 'caret-up' : 'caret-down'}
          onClick={() => setIsExpanded(!isExpanded)}
        />}
      </VStack>}
    </HStack>
  </BasicCard>;
};

QuestionExpandableCardView.propTypes = {
  question: PropTypes.object,
  isInteractive: PropTypes.bool,
};

QuestionExpandableCardView.defaultProps = { isInteractive: true };

export default QuestionExpandableCardView;
