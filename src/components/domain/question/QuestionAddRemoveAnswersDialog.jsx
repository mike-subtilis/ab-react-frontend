import {
  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import AnswerSearchableCheckList from '../answer/AnswerSearchableCheckList.jsx';
import ErrorAlert from '../../common/ErrorAlert.jsx';
import ToolbarButton from '../../common/ToolbarButton.jsx'
import useApiConnection from '../../../utils/apiConnection';

const QuestionAddRemoveAnswersDialog = ({ isOpen, onClose, question, onQuestionSaved }) => {
  const [error, setError] = useState(null);

  const { apiPut, hasPending } = useApiConnection();
  const [addedAndRemovedAnswers, setAddedAndRemovedAnswers] = useState({});
  const [hasAddedOrRemovedAnswers, setHasAddedOrRemovedAnswers] = useState(false);
  const answerTextFieldRef = useRef();

  function addAndRemoveAnswers() {
    apiPut(
      `/questions/${question.id}/update-answers?etag=${question._etag}`,
      addedAndRemovedAnswers)
      .then((updatedQuestion) => {
        onQuestionSaved(updatedQuestion);
        onClose();
      })
      .catch(e => setError(e.error));
  }

  return <Drawer
    isOpen={isOpen}
    placement='right'
    size='full'
    initialFocusRef={answerTextFieldRef}
    onClose={onClose}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton disabled={hasPending} />
      <DrawerHeader>Add Answers</DrawerHeader>

      <DrawerBody>
        {error && <ErrorAlert error={error} />}
        <AnswerSearchableCheckList
          question={question}
          firstFieldRef={answerTextFieldRef}
          onChange={(v) => {
            setAddedAndRemovedAnswers(v);
            const hasAddedAnswers = addedAndRemovedAnswers.addedAnswerIds && addedAndRemovedAnswers.addedAnswerIds.length;
            const hasRemovedAnswers = addedAndRemovedAnswers.removedAnswerIds && addedAndRemovedAnswers.removedAnswerIds.length;
            setHasAddedOrRemovedAnswers(hasAddedAnswers || hasRemovedAnswers);
          }}
        />
      </DrawerBody>

      <DrawerFooter>
        <ToolbarButton
          isDisabled={hasPending}
          variant='outline'
          mr={3}
          onClick={onClose}
          text='Cancel'
        />
        <ToolbarButton
          isDisabled={!hasAddedOrRemovedAnswers || hasPending}
          isInProgress={hasPending}
          colorScheme='green'
          onClick={addAndRemoveAnswers}
          iconKey='check'
          text='Save'
        />
      </DrawerFooter>
    </DrawerContent>
  </Drawer>;
};

QuestionAddRemoveAnswersDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onQuestionSaved: PropTypes.func,
  question: PropTypes.object,
};

export default QuestionAddRemoveAnswersDialog;
