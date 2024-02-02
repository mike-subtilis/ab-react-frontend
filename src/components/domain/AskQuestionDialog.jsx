import {
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  Button, Divider, HStack, Input, Select, VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import QuestionCompactView from './QuestionCompactView.jsx';
import ChakraTagInput from '../common/ChakraTagInput/index.jsx';
import useApiConnection from '../../utils/apiConnection';

const defaultQuestion = { prefix: 'What is the', text: '', tags: [] };

const AskQuestionDialog = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const [question, setQuestion] = useState(defaultQuestion);
  const [questionTextAdjective, setQuestionTextAdjective] = useState('Best');
  const [questionTextNoun, setQuestionTextNoun] = useState('');
  const { apiPost } = useApiConnection();

  useEffect(() => {
    setQuestion(q => ({ ...q, text: `${questionTextAdjective} ${questionTextNoun}` }));
  }, [questionTextAdjective, questionTextNoun]);

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
          <VStack gap={2} align='stretch'>
            <Select placeholder='Prefix'
              value={question.prefix}
              onChange={e => setQuestion(q => ({ ...q, prefix: e.target.value }))}>
              <option value='What is the'>What is the</option>
              <option value='Who is the'>Who is the</option>
              <option value='Where is the'>Where is the</option>
            </Select>
            <HStack gap={2}>
              <Input placeholder='e.g. Best, Cheapest, Fastest, Favorite, ...'
                size='md'
                minWidth={200}
                value={questionTextAdjective}
                onChange={e => setQuestionTextAdjective(e.target.value)} />
              <Input placeholder='thing'
                size='md'
                flexGrow={1}
                minWidth={200}
                value={questionTextNoun}
                onChange={e => setQuestionTextNoun(e.target.value)} />
            </HStack>
            <ChakraTagInput
              placeholder='Tags (e.g. enter a keyword and press Enter)'
              tags={question.tags}
              onTagsChange={(e, t) => setQuestion(q => ({ ...q, tags: t }))}
              tagProps={{ size: 'sm', borderRadius: 'full', colorScheme: 'red', variant: 'solid' }}/>
          </VStack>

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
