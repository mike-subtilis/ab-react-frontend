import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import Tag from './Tag.jsx';
import { formatDateTimeFriendly } from '../../utils/dateUtils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionCompactView = ({ question, ...others }) => {
  /* 
  <VStack justify='stretch'>
    <FontAwesomeIcon icon={['far', 'star']} />
    <div style={{ width: 1, height: 1 }} />
    <FontAwesomeIcon icon='exclamation-triangle' />
  </VStack>
  */

  return <Box boxShadow='base' p='4' rounded='md' bg='white' {...others}>
    <HStack justify='space-between' align='stretch'>
      <VStack align='flex-start' gap={0}>
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
      </VStack>
    </HStack>
  </Box>;
};

export default QuestionCompactView;
