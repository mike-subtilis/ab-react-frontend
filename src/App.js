import { useAuth0 } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { Container } from "reactstrap";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from './components/Footer.jsx';
import Profile from "./views/Profile";
import HomePage from './views/HomePage.jsx';
import QuestionsPage from './views/QuestionsPage.jsx';
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <ChakraProvider>
          <NavBar />
          <Container className="flex-grow-1 mt-2">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/questions" exact component={QuestionsPage} />              
              <Route path="/profile" component={Profile} />
            </Switch>
          </Container>
          <Footer />
        </ChakraProvider>
      </div>
    </Router>
  );
};

export default App;
