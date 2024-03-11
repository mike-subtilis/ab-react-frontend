import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag.jsx';
import { Text } from '../../common/text/index.jsx';
import { Box, HStack, VStack } from '../../common/layout/index.jsx';

const AnswerCompactView = ({ answer, ...others }) => {
  return <Box boxShadow='base' p='4' rounded='md' bg='white' {...others}>
    <HStack justify='space-between' align='stretch'>
      <VStack align='flex-start' gap={0}>
        <Text fontSize='sm' style={{ color: 'gray', marginBottom: 0 }}>{answer.text}</Text>
        <HStack gap={0.5}>
          {(answer.tags || []).map(t => <Tag tagText={t} key={t} />)}
        </HStack>
      </VStack>
    </HStack>
  </Box>;
};

AnswerCompactView.propTypes = { answer: PropTypes.object };

export default AnswerCompactView;
