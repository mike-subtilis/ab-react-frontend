import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import AnswerSimpleCard from './AnswerSimpleCard.jsx';
import ButtonIcon from '../../common/ButtonIcon.jsx';
import Spinner from '../../common/Spinner.jsx';
import { Button, Checkbox } from '../../common/index.jsx';
import { HStack, SimpleGrid, VStack, Divider } from '../../common/layout/index.jsx';
import { Text, TextArea } from '../../common/text/index.jsx';
import arrayUtil from '../../../utils/arrayUtil.js';
import useApiConnection from '../../../utils/apiConnection.js';
import useDebouncedEffect from '../../../utils/useDebouncedEffect.js';

const AnswerInputAndFoundList = forwardRef(function AnswerInputAndFoundList(props, ref) {
  const { question, onChange } = props;
  const [answerText, setAnswerText] = useState('');
  const [newAnswers, setNewAnswers] = useState([]);
  const [existingAnswers, setExistingAnswers] = useState([]);
  const [addedAnswerIds, setAddedAnswerIds] = useState([]);
  const [removedAnswerIds, setRemovedAnswerIds] = useState([]);
  const [localError, setLocalError] = useState(null);
  const { apiGet, apiPost, hasPending } = useApiConnection();

  function areAnswersEqual(a, b) {
    if (a.text !== b.text) {
      return false;
    }

    const safeATags = a.tags || [];
    const safeBTags = b.tags || [];
    if (safeATags.length !== safeBTags.length || arrayUtil.intersection(safeATags, safeBTags).length !== safeATags.length) {
      return false;
    }

    return true;
  }

  function hasExactMatch(answerToCheck, existingAnswers) {
    return existingAnswers.some(a => areAnswersEqual(a, answerToCheck));
  }

  useDebouncedEffect(() => {
    setLocalError(null);
    const trimmedAnswerText = answerText.split('\n').map(t => t.trim()).filter(t => !!t);
    const filters = { text: trimmedAnswerText.join(','), includeQuestionIds: true };
    apiGet(`/answers?${new URLSearchParams(filters).toString()}`)
      .then((responseData) => {
        setExistingAnswers(responseData || []);
        const nonExistingAnswerText = trimmedAnswerText
          .filter(answerText => !hasExactMatch({ text: answerText }, responseData));
        const nonExistingAnswers = nonExistingAnswerText
          .map(answerText => ({ text: answerText }));
        setNewAnswers(nonExistingAnswers);
      })
      .catch(e => setLocalError(e.error));
  }, [answerText]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onChange) {
      onChange({ addedAnswerIds, removedAnswerIds });
    }
  }, [addedAnswerIds, removedAnswerIds]);

  if (localError) {
    return localError;
  }

  function addNewAnswer(newAnswer) {
    setLocalError(null);
    apiPost('/answers', newAnswer)
      .then(postedAnswer => setAddedAnswerIds([...addedAnswerIds, postedAnswer.id]))
      .catch(e => setLocalError(e.error));
  }

  // TODO: if hasExactMatch, then the user MUST add some disambiguity info

  function buildAnswerCheckbox(a) {
    return <Checkbox
      key={a.id}
      data-answerid={a.id}
      size='lg'
      isChecked={!removedAnswerIds.includes(a.id) && (addedAnswerIds.includes(a.id) || (a.questionIds && a.questionIds.includes(question.id)))}
      onChange={(e) => {
        if (e.target.checked) {
          if (removedAnswerIds.includes(a.id)) {
            setRemovedAnswerIds(removedAnswerIds.filter(id => id !== a.id));
          } else {
            setAddedAnswerIds(p => [...p, a.id]);
          }
        } else {
          if (addedAnswerIds.includes(a.id)) {
            setAddedAnswerIds(addedAnswerIds.filter(id => id !== a.id));
          } else {
            setRemovedAnswerIds(p => [...p, a.id]);
          }
        }
      }}>
      <AnswerSimpleCard answer={a} key={a.id} />
    </Checkbox>;
  }

  function selectAll() {
    const existingAnswerIds = existingAnswers.map(a => a.id);
    const newRemovedAnswerIds = arrayUtil.difference(removedAnswerIds, existingAnswerIds);
    setRemovedAnswerIds(newRemovedAnswerIds);
    const newAddedAnswerIds = arrayUtil.uniq([...addedAnswerIds, ...existingAnswerIds]);
    setAddedAnswerIds(newAddedAnswerIds);
  }

  return <VStack gap={2} alignItems='stretch'>
    <SimpleGrid columns={2} spacing={5}>
      <TextArea
        ref={ref}
        placeholder='Enter one answer per line'
        value={answerText}
        onChange={e => setAnswerText(e.target.value)}
        style={{ height: '100%' }}
      />
      <VStack alignItems='flex-start' flexGrow={1}>
        {hasPending && <Spinner />}
        {!hasPending && (existingAnswers.length === 0) && <Text>No answers found</Text>}

        {newAnswers.map(a => <HStack gap={2} key={a.id}>
            <ButtonIcon
              iconKey='plus'
              disabled={hasExactMatch({ text: answerText }, existingAnswers)}
              onClick={() => addNewAnswer({ text: answerText })}
            />
            {buildAnswerCheckbox(a)}
          </HStack>)}
        {(newAnswers.length > 0 && existingAnswers.length > 0) && <Divider />}
        {(answerText.length > 0) && (existingAnswers.length > 0) &&
          <Button onClick={selectAll}>
            Select {existingAnswers.length} Existing Answers
          </Button>}
        {existingAnswers.map(buildAnswerCheckbox)}
      </VStack>
    </SimpleGrid>
  </VStack>;
});

AnswerInputAndFoundList.propTypes = {
  question: PropTypes.object,
  onChange: PropTypes.func,
};

export default AnswerInputAndFoundList;
