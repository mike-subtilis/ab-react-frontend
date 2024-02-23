import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  Button, Divider, HStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import QuestionEditor from './QuestionEditor.jsx';
import QuestionCompactView from './QuestionCompactView.jsx';
import useApiConnection from '../../../utils/apiConnection';

const defaultQuestion = { prefix: 'What is the', text: '', tags: [] };

const AskQuestionDialog = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const [question, setQuestion] = useState(defaultQuestion);
  const { apiPost } = useApiConnection();

  return <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Ask a new Question
        </AlertDialogHeader>

        <AlertDialogBody>
          <QuestionEditor question={question} onChange={q => setQuestion({ ...q })} />

          <Divider />

          <QuestionCompactView question={question} />
        </AlertDialogBody>

        <AlertDialogFooter>
          <HStack gap={2}>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => {
              apiPost('/api/questions', question);
              onClose();
            }}>
              Ask
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>;
};

AskQuestionDialog.propTypes = { isOpen: PropTypes.bool, onClose: PropTypes.func };

export default AskQuestionDialog;
