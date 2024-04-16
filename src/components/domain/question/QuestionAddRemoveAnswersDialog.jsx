import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import AnswerInputAndFoundList from '../answer/AnswerInputAndFoundList.jsx';
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
      `/questions/${question.id}/update-answers?etag=${question.etag}`,
      addedAndRemovedAnswers)
      .then((updatedQuestion) => {
        onQuestionSaved(updatedQuestion);
        onClose();
      })
      .catch(e => setError(e.error));
  }

  return <Modal
    isOpen={isOpen}
    size='full'
    initialFocusRef={answerTextFieldRef}
    onClose={onClose}
    scrollBehavior='inside'
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add Answers</ModalHeader>
      <ModalCloseButton disabled={hasPending} />

      <ModalBody>
        {error && <ErrorAlert error={error} />}

        <AnswerInputAndFoundList
          question={question}
          firstFieldRef={answerTextFieldRef}
          onChange={(v) => {
            setAddedAndRemovedAnswers(v);
            const hasAddedAnswers = addedAndRemovedAnswers.addedAnswerIds && addedAndRemovedAnswers.addedAnswerIds.length;
            const hasRemovedAnswers = addedAndRemovedAnswers.removedAnswerIds && addedAndRemovedAnswers.removedAnswerIds.length;
            setHasAddedOrRemovedAnswers(hasAddedAnswers || hasRemovedAnswers);
          }}
        />
      </ModalBody>

      <ModalFooter>
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
      </ModalFooter>
    </ModalContent>
  </Modal>;
};

QuestionAddRemoveAnswersDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onQuestionSaved: PropTypes.func,
  question: PropTypes.object,
};

export default QuestionAddRemoveAnswersDialog;
