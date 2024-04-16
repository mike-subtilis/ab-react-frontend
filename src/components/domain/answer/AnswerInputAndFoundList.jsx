import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AnswerSimpleCard from './AnswerSimpleCard.jsx';
import ButtonIcon from '../../common/ButtonIcon.jsx';
import Spinner from '../../common/Spinner.jsx';
import { Checkbox } from '../../common/index.jsx';
import { HStack, SimpleGrid, VStack, Divider } from '../../common/layout/index.jsx';
import { Text, TextArea } from '../../common/text/index.jsx';
import arrayUtil from '../../../utils/arrayUtil.js';
import useApiConnection from '../../../utils/apiConnection.js';
import useDebouncedEffect from '../../../utils/useDebouncedEffect.js';

const AnswerInputAndFoundList = ({ question, firstFieldRef, onChange }) => {
  const [answerText, setAnswerText] = useState('');
  const [newAnswers, setNewAnswers] = useState([]);
  const [existingAnswers, setExistingAnswers] = useState([]);
  const [checkedAnswerIds, setCheckedAnswerIds] = useState(question.answerIds || []);
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
    const filters = { text: trimmedAnswerText.join(',') };
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
  }, [addedAnswerIds, removedAnswerIds, onChange]);

  if (localError) {
    return localError;
  }

  function addNewAnswer(newAnswer) {
    setLocalError(null);
    apiPost('/answers', newAnswer)
      .then((postedAnswer) => {
        setAddedAnswerIds([...addedAnswerIds, postedAnswer.id]);
        setCheckedAnswerIds([...checkedAnswerIds, postedAnswer.id]);
      })
      .catch(e => setLocalError(e.error));
  }

  // TODO: if hasExactMatch, then the user MUST add some disambiguity info

  function buildAnswerCheckbox(a) {
    return <Checkbox
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
      <AnswerSimpleCard answer={a} key={a.id} />
    </Checkbox>;
  }

  return <SimpleGrid columns={2} spacing={5}>
    <TextArea
      ref={firstFieldRef}
      placeholder='Enter one answer per line'
      value={answerText}
      onChange={e => setAnswerText(e.target.value)}
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
      {(newAnswers.length && existingAnswers.length) && <Divider />}
      {existingAnswers.map(buildAnswerCheckbox)}
    </VStack>
  </SimpleGrid>;
};

AnswerInputAndFoundList.propTypes = {
  question: PropTypes.object,
  firstFieldRef: PropTypes.any,
  onChange: PropTypes.func,
};

export default AnswerInputAndFoundList;
