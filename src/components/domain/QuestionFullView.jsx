import { useAuth0 } from '@auth0/auth0-react';
import { Heading, Text, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Tag from './Tag.jsx';
import Spinner from '../common/Spinner.jsx';
import { useApiConnection } from '../../utils/apiConnection.js';
import { formatDateTimeFriendly } from '../../utils/dateUtils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionFullView = ({ questionId, onError, ...others }) => {
  const { isAuthenticated } = useAuth0();
  const { apiGet, hasPending } = useApiConnection();
  const [question, setQuestion] = useState(null);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onError(null);
    (isAuthenticated ? apiGet(`/api/questions/${questionId}`) : apiGet(`/api/public/questions/${questionId}`))
      .then(responseData => setQuestion(responseData || null))
      .catch(e => onError(e.error));
  }, []);

  if (hasPending) return <Spinner />;
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
    {(question.createdByUserName || question.createdAt) &&
      <Text fontSize='xs' style={{ color: 'gray', marginBottom: 0 }}>
        {question.createdByUserName}
        &nbsp;on&nbsp;
        {formatDateTimeFriendly(question.createdAt)}
      </Text>}
  </VStack>;
};

export default QuestionFullView;
