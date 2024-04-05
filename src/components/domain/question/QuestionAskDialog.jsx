import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionEditor from './QuestionEditor.jsx';
import QuestionExpandableCardView from './QuestionExpandableCardView.jsx';
import { Button } from '../../common/index.jsx';
import { Divider, HStack } from '../../common/layout/index.jsx';
import useApiConnection from '../../../utils/apiConnection';

const defaultQuestion = { prefix: 'What is the', metric: 'Favorite' };

const AskQuestionDialog = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const [question, setQuestion] = useState(defaultQuestion);
  const { apiPost } = useApiConnection();
  const navigate = useNavigate();

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

          <QuestionExpandableCardView question={question} isInteractive={false} />
        </AlertDialogBody>

        <AlertDialogFooter>
          <HStack gap={2}>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={async () => {
              const addedQuestion = await apiPost('/questions', question);
              onClose();
              navigate(`/questions/${addedQuestion.id}`);
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
