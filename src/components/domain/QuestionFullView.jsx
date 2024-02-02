import { Heading, Text, HStack, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Tag from './Tag.jsx';
import { formatDateTimeFriendly } from '../../utils/dateUtils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionFullView = ({ question, ...others }) => {
  if (!question) return 'This question was not found';

  /*
  <VStack justify='stretch'>
    <FontAwesomeIcon icon={['far', 'star']} />
    <div style={{ width: 1, height: 1 }} />
    <FontAwesomeIcon icon='exclamation-triangle' />
  </VStack>
  */

  return <VStack align='flex-start' gap={0} {...others}>
    <Text fontSize='sm' style={{ color: 'gray', marginBottom: 0 }}>{question.prefix}</Text>
    <Heading size='lg'>{question.text}</Heading>
    <HStack gap={0.5}>
      {(question.tags || []).map(t => <Tag tagText={t} key={t} />)}
    </HStack>
    {(question.createdByUserName || question.createdAt)
      && <Text fontSize='xs' style={{ color: 'gray', marginBottom: 0 }}>
        {question.createdByUserName}
        &nbsp;on&nbsp;
        {formatDateTimeFriendly(question.createdAt)}
      </Text>}
  </VStack>;
};

QuestionFullView.propTypes = { question: PropTypes.object };

export default QuestionFullView;
