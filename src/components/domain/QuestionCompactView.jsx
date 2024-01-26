import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import Tag from './Tag.jsx';
import { formatDateTimeFriendly } from '../../utils/dateUtils';

const QuestionCompactView = ({ question, ...others }) => {
  return <Box boxShadow='base' p='4' rounded='md' bg='white' {...others}>
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
  </Box>;
};

export default QuestionCompactView;
