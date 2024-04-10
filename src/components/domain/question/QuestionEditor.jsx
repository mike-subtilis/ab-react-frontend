import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import TagInput from '../../common/ChakraTagInput/index.jsx';
import { Input, Label, RadioGroup, Radio, Select, Switch } from '../../common/index.jsx';
import { HStack, VStack } from '../../common/layout/index.jsx';
import { SmallText } from '../../common/text/index.jsx';

const defaultQuestion = {
  prefix: 'What is the',
  metric: 'Best',
  publicity: 'private',
};

const QuestionEditor = ({ question, onChange }) => {
  const [localQuestion, setLocalQuestion] = useState({ ...defaultQuestion, ...question });
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      onChange(localQuestion);
    }
  }, [localQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const canVotingBeOpened = question.answerIds && (question.answerIds.length >= 2);
  return <VStack gap={4} align='stretch'>
    <VStack gap={1} align='stretch'>
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
    </VStack>

    <TagInput
      placeholder='Tags (e.g. enter a keyword and press Enter)'
      tags={localQuestion.tags}
      onTagsChange={(e, t) => setLocalQuestion(q => ({ ...q, tags: t }))}
      tagProps={{ size: 'sm', borderRadius: 'full', colorScheme: 'red', variant: 'solid' }} />

    <VStack alignItems='flex-start' gap={0}>
      <Label sx={{ mb: 0 }}>Who can see this question?</Label>
      <RadioGroup onChange={v => setLocalQuestion(q => ({ ...q, publicity: v }))} value={localQuestion.publicity}>
        <HStack gap={8}>
          <Radio value='private'>Just Me</Radio>
          <Radio value='public'>Registered Users</Radio>
          <Radio value='anonymous'>Anyone</Radio>
        </HStack>
      </RadioGroup>
    </VStack>

    <VStack alignItems='flex-start' gap={0}>
      <Switch
        value={localQuestion.isVotingOpen}
        onChange={v => setLocalQuestion(q => ({ ...q, isVotingOpen: v }))}
        label='Is Voting Open?'
        isDisabled={!canVotingBeOpened}
        sx={{ mb: 0 }}
      />
      {!canVotingBeOpened && <SmallText validation>At least 2 answers are needed</SmallText>}
    </VStack>
  </VStack>;
};

QuestionEditor.propTypes = {
  question: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionEditor;
