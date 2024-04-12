import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag.jsx';
import { HStack, VStack } from '../../common/layout/index.jsx';
import { Heading, SmallText, Text } from '../../common/text/index.jsx';
import { formatDateTimeFriendly } from '../../../utils/dateUtils';

const QuestionCompactView = ({ question, ...others }) => {
  if (!question) return null;

  return <VStack align='flex-start' gap={0} style={{ position: 'relative' }} {...others}>
    <Text fontSize='sm' style={{ color: 'gray', marginBottom: 0 }}>{question.prefix}</Text>
    <Heading size='lg'>{question.metric} {question.subject}</Heading>
    <HStack gap={0.5}>
      {(question.tags || []).map(t => <Tag tagText={t} key={t} />)}
    </HStack>
    {(question.createdByUserName || question.createdAt) &&
      <SmallText>
        {question.createdByUserName}
        &nbsp;on&nbsp;
        {formatDateTimeFriendly(question.createdAt)}
      </SmallText>}
  </VStack>;
};

QuestionCompactView.propTypes = { question: PropTypes.object };

export default QuestionCompactView;
