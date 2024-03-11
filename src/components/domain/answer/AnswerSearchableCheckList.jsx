import { Checkbox, Input, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AnswerCompactView from './AnswerCompactView.jsx';
import ButtonIcon from '../../common/ButtonIcon.jsx';
import Spinner from '../../common/Spinner.jsx';
import { HStack, VStack } from '../../common/layout/index.jsx';
import arrayUtil from '../../../utils/arrayUtil.js';
import useApiConnection from '../../../utils/apiConnection.js';
import useDebouncedEffect from '../../../utils/useDebouncedEffect.js';

const AnswerSearchableCheckList = ({ question, firstFieldRef, onChange }) => {
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [checkedAnswerIds, setCheckedAnswerIds] = useState(question.answerIds || []);
  const [addedAnswerIds, setAddedAnswerIds] = useState([]);
  const [removedAnswerIds, setRemovedAnswerIds] = useState([]);
  const [localError, setLocalError] = useState(null);
  const { apiGet, apiPost, hasPending } = useApiConnection();

  useDebouncedEffect(() => {
    setLocalError(null);
    const filters = { text: answerText };
    apiGet(`/answers?${new URLSearchParams(filters).toString()}`)
      .then(responseData => setAnswers(responseData || []))
      .catch(e => setLocalError(e.error));
  }, [answerText]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onChange) {
      onChange({ addedAnswerIds, removedAnswerIds });
    }
  }, [addedAnswerIds, removedAnswerIds, onChange]);

  if (localError) {
    return localError;
  }

  function addNewAnswer(newAnswer) {
    setLocalError(null);
    apiPost('/answers', newAnswer)
      .then((postedAnswer) => {
        setAnswerText('');
        setAddedAnswerIds([...addedAnswerIds, postedAnswer.id]);
        setCheckedAnswerIds([...checkedAnswerIds, postedAnswer.id]);
      })
      .catch(e => setLocalError(e.error));
  }

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

  // TODO: if hasExactMatch, then the user MUST add some disambiguity info

  return <VStack alignItems='stretch'>
    <Input
      ref={firstFieldRef}
      placeholder='Answer Text'
      size='md'
      flexGrow={1}
      minWidth={200}
      value={answerText}
      onChange={e => setAnswerText(e.target.value)}
    />

    {!!answerText && <HStack gap={2}>
      <ButtonIcon
        iconKey='plus'
        disabled={hasExactMatch({ text: answerText }, answers)}
        onClick={() => addNewAnswer({ text: answerText })}
      />      
      <AnswerCompactView answer={{ text: answerText }} />
    </HStack>}

    {hasPending && <Spinner />}
    {!hasPending && (answers.length === 0) && <Text>No answers found</Text>}

    {answers.map(a =>
      <Checkbox
        key={a.id}
        data-answerid={a.id}
        size='lg'
        isChecked={checkedAnswerIds.includes(a.id)}
        onChange={(e) => {
          let newCheckedAnswerIds;
          if (e.target.checked) {
            if (removedAnswerIds.includes(a.id)) {
              setRemovedAnswerIds(removedAnswerIds.filter(id => id !== a.id));
            } else {
              setAddedAnswerIds(p => [...p, a.id]);
            }
            newCheckedAnswerIds = [...checkedAnswerIds, a.id];
          } else {
            if (addedAnswerIds.includes(a.id)) {
              setAddedAnswerIds(addedAnswerIds.filter(id => id !== a.id));
            } else {
              setRemovedAnswerIds(p => [...p, a.id]);
            }
            newCheckedAnswerIds = checkedAnswerIds.filter(v => v !== a.id);
          }
          setCheckedAnswerIds(newCheckedAnswerIds);
        }}>
        <AnswerCompactView answer={a} key={a.id} />
      </Checkbox>)}
  </VStack>;
};

AnswerSearchableCheckList.propTypes = {
  question: PropTypes.object,
  firstFieldRef: PropTypes.any,
  onChange: PropTypes.func,
};

export default AnswerSearchableCheckList;
