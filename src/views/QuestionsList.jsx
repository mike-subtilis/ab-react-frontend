import React, { useState } from 'react';
import { Alert, AlertIcon, AlertDescription, Button, Grid } from '@chakra-ui/react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getConfig } from "../config";
import Loading from "../components/Loading";
import Question from './Question.jsx';

export const QuestionsList = (props) => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const [questions, setQuestions] = useState([]);

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callQuestionsApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callQuestionsApi();
  };

  const callQuestionsApi = async () => {
    try {
      setState({
        ...state,
        showResult: false,
        apiMessage: null,
      });

      const token = await getAccessTokenSilently();

      const response = await fetch(`${apiOrigin}/api/questions/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      setQuestions(responseData || []);
      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return <div>
    {state.error === "consent_required" && (
      <Alert status='warning'>
        <AlertIcon />
        <AlertDescription>
          You need to{" "}
          <a
            href="#/"
            class="alert-link"
            onClick={(e) => handle(e, handleConsent)}
          >
            consent to get access to users api
          </a>
        </AlertDescription>
      </Alert>
    )}

    {state.error === "login_required" && (
      <Alert status='warning'>
        <AlertIcon />
        <AlertDescription>
          You need to{" "}
          <a
            href="#/"
            class="alert-link"
            onClick={(e) => handle(e, handleLoginAgain)}
          >
            log in again
          </a>
        </AlertDescription>
      </Alert>
    )}

    <Button
      onClick={callQuestionsApi}
      colorScheme='red'
      disabled={!audience}
    >
      Ping API
    </Button>

    <Grid gap={2} autoFlow='row'>
      {questions.map(q => <Question question={q} key={q.id} />)}
    </Grid>

  </div>;
};

export default withAuthenticationRequired(QuestionsList, {
  onRedirecting: () => <Loading />,
});
