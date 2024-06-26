import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarChart from '../components/charts/BarChart.jsx';
import ReauthenticateAlert from '../components/common/ReauthenticateAlert.jsx';
import { Button, Toolbar, ToolbarButton, Spinner } from '../components/common/index.jsx';
import { Divider, HStack, VStack } from '../components/common/layout/index.jsx';
import { Heading, Stat } from '../components/common/text/index.jsx';
import QuestionAddRemoveAnswersDialog from '../components/domain/question/QuestionAddRemoveAnswersDialog.jsx';
import QuestionEditor from '../components/domain/question/QuestionEditor.jsx';
import QuestionCompactView from '../components/domain/question/QuestionCompactView.jsx';
import useApiConnection from '../utils/apiConnection';

const QuestionPage = () => {
  const params = useParams();
  const [error, setError] = useState(null);

  const { apiGet, apiPut, hasPending, isAuthenticated } = useApiConnection();
  const [question, setQuestion] = useState(null);
  const [localQuestion, setLocalQuestion] = useState(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [canUpdate, setCanUpdate] = useState(false);
  const [canUpdateAnswers, setCanUpdateAnswers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddRemoveAnswersOpen, setIsAddRemoveAnswersOpen] = useState(false);
  const [votes, setVotes] = useState(0);
  const [answerWins, setAnswerWins] = useState([]);

  useEffect(() => {
    setError(null);
    const queryOptions = { includeAnswerCount: true };
    apiGet(`/questions/${params.questionId}?${new URLSearchParams(queryOptions).toString()}`)
      .then((responseData) => {
        setQuestion(responseData || null);
        setLocalQuestion(responseData || null);
        setAnswerCount(responseData.answerCount);
      })
      .catch(e => setError(e.error));

    if (isAuthenticated) {
      apiGet(`/users/me/has-permission/${params.questionId}?keys=question:update,question:update:update-answers`)
        .then((responseData) => {
          setCanUpdate(responseData.includes('question:update'));
          setCanUpdateAnswers(responseData.includes('question:update:update-answers'));
        })
        .catch(e => setError(e.error));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (question) {
      apiGet(`/questions/${question.id}/results?count=1000`)
        .then((resultsData) => {
          setVotes(resultsData.votes);
          setAnswerWins(resultsData.answerWins);
        })
        .catch(ex => { console.error(ex); });
    } else {
      setAnswerCount(0);
      setVotes(0);
      setAnswerWins([]);
    }
  }, [question]); // eslint-disable-line react-hooks/exhaustive-deps

  if (hasPending) return <Spinner />;

  function saveQuestion() {
    setIsSaving(true);
    apiPut(
      `/questions/${localQuestion.id}?etag=${localQuestion.etag}`,
      localQuestion,
    )
      .then((updatedQuestion) => {
        setQuestion(updatedQuestion || null);
        setLocalQuestion(updatedQuestion || null);
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
        onClick={() => saveQuestion()}
      />}
    </Toolbar>
    <VStack alignItems='flex-start' sx={{ p: 4 }}>
      <ReauthenticateAlert error={error} clearError={() => setError(null)} />
      {!isEditing && <QuestionCompactView question={question} />}
      {isEditing &&
        <QuestionEditor
          question={localQuestion}
          answerCount={answerCount}
          onChange={q => setLocalQuestion(q)}
        />}

      <Divider />

      <Heading size='lg'>
        <HStack gap={2} alignItems='baseline'>
          <span>{answerCount}</span>
          <span>Answers</span>
          {canUpdateAnswers && <Button
            size='sm'
            onClick={() => setIsAddRemoveAnswersOpen(true)}
          >
            Add / Remove Answers
          </Button>}
        </HStack>
      </Heading>

      <Stat heading='Total Votes' value={votes} />
      <BarChart
        items={answerWins}
        labelFieldName='text'
        valueFieldName='wins'
      />

      <QuestionAddRemoveAnswersDialog
        isOpen={isAddRemoveAnswersOpen}
        onClose={() => setIsAddRemoveAnswersOpen(false)}
        question={question}
        onQuestionSaved={q => setQuestion(q)}
      />
    </VStack>
  </VStack>;
};

export default QuestionPage;
