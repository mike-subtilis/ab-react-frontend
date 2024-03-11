import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import QuestionCompactView from './QuestionCompactView.jsx';
import { Box, HStack } from '../../common/layout/index.jsx';

const QuestionSimpleCardView = ({ question, ...others }) => {
  /* 
  <VStack justify='stretch'>
    <FontAwesomeIcon icon={['far', 'star']} />
    <div style={{ width: 1, height: 1 }} />
    <FontAwesomeIcon icon='exclamation-triangle' />
  </VStack>
  */

  return <Box boxShadow='base' p='4' rounded='md' bg='white' {...others}>
    <HStack justify='space-between' align='stretch'>
      <LinkBox>
        <LinkOverlay to={`/questions/${question.id}`} as={ReactRouterLink}>
          <QuestionCompactView question={question} />
        </LinkOverlay>
      </LinkBox>
    </HStack>
  </Box>;
};

QuestionSimpleCardView.propTypes = { question: PropTypes.object };

export default QuestionSimpleCardView;
