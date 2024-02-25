import { HStack, Input, Select, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import TagInput from '../../common/ChakraTagInput/index.jsx';

const defaultQuestion = {
  prefix: 'What is the',
  metric: 'Best',
};

const QuestionEditor = ({ question, onChange }) => {
  const [localQuestion, setLocalQuestion] = useState({ ...defaultQuestion, ...question });

  useEffect(() => {
    onChange(localQuestion);
  }, [localQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  return <VStack gap={2} align='stretch'>
    <Select
      value={localQuestion.prefix}
      onChange={e => setLocalQuestion(q => ({ ...q, prefix: e.target.value }))}>
      <option value='What is the'>What is the</option>
      <option value='Where is the'>Where is the</option>
      <option value='Which is the'>Which is the</option>
      <option value='Who is the'>Who is the</option>
    </Select>
    <HStack gap={2}>
      <Input placeholder='Metric e.g. Best, Cheapest, Fastest, Favorite, ...'
        size='md'
        minWidth={200}
        value={localQuestion.metric}
        onChange={e => setLocalQuestion(q => ({ ...q, metric: e.target.value }))} />
      <Input placeholder='Subject'
        size='md'
        flexGrow={1}
        minWidth={200}
        value={localQuestion.subject}
        onChange={e => setLocalQuestion(q => ({ ...q, subject: e.target.value }))} />
    </HStack>
    <TagInput
      placeholder='Tags (e.g. enter a keyword and press Enter)'
      tags={localQuestion.tags}
      onTagsChange={(e, t) => setLocalQuestion(q => ({ ...q, tags: t }))}
      tagProps={{ size: 'sm', borderRadius: 'full', colorScheme: 'red', variant: 'solid' }} />
  </VStack>;
};

QuestionEditor.propTypes = {
  question: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionEditor;
