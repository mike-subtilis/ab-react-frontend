import { VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Toolbar from '../components/common/Toolbar.jsx';
import ToolbarButton from '../components/common/ToolbarButton.jsx';
import QuestionEditor from '../components/domain/question/QuestionEditor.jsx';
import QuestionFullView from '../components/domain/question/QuestionFullView.jsx';
import useApiConnection from '../utils/apiConnection';

const QuestionPage = () => {
  const params = useParams();
  const [error, setError] = useState(null);

  const { apiGet, apiPut, hasPending } = useApiConnection();
  const [question, setQuestion] = useState(null);
  const [canUpdate, setCanUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setError(null);
    apiGet(`/questions/${params.questionId}`)
      .then(responseData => setQuestion(responseData || null))
      .catch(e => setError(e.error));

    apiGet(`/users/me/has-permission/${params.questionId}?keys=question:update`)
      .then(responseData => setCanUpdate(responseData.includes('question:update')))
      .catch(e => setError(e.error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;

  function saveQuestion() {
    setIsSaving(true);
    apiPut(`/questions/${question.id}?etag=${question._etag}`, question)
      .then((updatedQuestion) => {
        setQuestion(updatedQuestion || null);
        setIsEditing(false);
      })
      .catch(e => setError(e.error))
      .finally(() => setIsSaving(false));
  }

  return <VStack align='stretch'>
    <Toolbar>
      {canUpdate && !isEditing && <ToolbarButton
        iconKey='edit'
        text='Edit'
        onClick={() => setIsEditing(true)}
      />}
      {canUpdate && isEditing && <ToolbarButton
        text='Cancel'
        onClick={() => setIsEditing(false)}
      />}
      {canUpdate && isEditing && <ToolbarButton
        text='Save'
        colorScheme='green'
        disabled={isSaving}
        onClick={() => saveQuestion(false)}
      />}
    </Toolbar>
    <VStack alignItems='flex-start' sx={{ p: 4 }}>
      <ReauthenticateAlert error={error} clearError={() => setError(null)} />
      {!isEditing && <QuestionFullView question={question} />}
      {isEditing && <QuestionEditor question={question} onChange={q => setQuestion(q)} />}
    </VStack>
  </VStack>;
};

export default QuestionPage;
