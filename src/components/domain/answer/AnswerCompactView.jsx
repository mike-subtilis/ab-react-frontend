import PropTypes from 'prop-types';
import React from 'react';
import Tag from '../Tag.jsx';
import { Image } from '../../common/index.jsx';
import { Text } from '../../common/text/index.jsx';
import { HStack, VStack } from '../../common/layout/index.jsx';

const AnswerCompactView = ({ answer }) => {
  return <VStack align='flex-start' gap={0}>
    {answer.imageUrl && <Image src={answer.imageUrl} width={100} height={100} />}
    <Text fontSize='sm' style={{ color: 'gray', marginBottom: 0 }}>{answer.text}</Text>
    <HStack gap={0.5}>
      {(answer.tags || []).map(t => <Tag tagText={t} key={t} />)}
    </HStack>
  </VStack>;
};

AnswerCompactView.propTypes = { answer: PropTypes.object };

export default AnswerCompactView;
