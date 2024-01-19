import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const QuestionsList = (props) => {
  const { apiOrigin = "http://localhost:3001", audience } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

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
      <Alert color="warning">
        You need to{" "}
        <a
          href="#/"
          class="alert-link"
          onClick={(e) => handle(e, handleConsent)}
        >
          consent to get access to users api
        </a>
      </Alert>
    )}

    {state.error === "login_required" && (
      <Alert color="warning">
        You need to{" "}
        <a
          href="#/"
          class="alert-link"
          onClick={(e) => handle(e, handleLoginAgain)}
        >
          log in again
        </a>
      </Alert>
    )}

    <h2>List of Questions I suppose</h2>
    <Button
      color="primary"
      className="mt-5"
      onClick={callQuestionsApi}
      disabled={!audience}
    >
      Ping API
    </Button>

    <div className="result-block-container">
      {state.showResult && (
        <div className="result-block" data-testid="api-result">
          <h6 className="muted">Result</h6>
          <Highlight>
            <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
          </Highlight>
        </div>
      )}
    </div>

  </div>;
};

export default withAuthenticationRequired(QuestionsList, {
  onRedirecting: () => <Loading />,
});
