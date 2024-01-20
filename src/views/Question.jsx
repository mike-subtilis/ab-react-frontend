import { Box } from '@chakra-ui/react';

const Question = ({ question, ...others }) => {
  return <Box boxShadow='base' p='6' rounded='md' bg='white' {...others}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <small style={{ color: 'gray' }}>{question.prefix}</small>
      <strong>{question.text}</strong>
    </div>
  </Box>
};

export default Question;
