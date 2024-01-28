import { useAuth0 } from '@auth0/auth0-react';
import { ChakraProvider, Container } from '@chakra-ui/react'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import Spinner from './components/common/Spinner.jsx';
import AboutPage from './views/AboutPage.jsx';
import HomePage from './views/HomePage.jsx';
import ProfilePage from './views/ProfilePage.jsx';
import QuestionPage from './views/QuestionPage.jsx';
import QuestionsPage from './views/QuestionsPage.jsx';
import initFontAwesome from './utils/initFontAwesome';

// styles
import "./App.css";

// fontawesome
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <div id="app" className="d-flex flex-column h-100">
        <ChakraProvider>
          <NavBar />
          <Container maxW='100%' sx={{ p: 2}} style={{ flexGrow: 1 }}>
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/questions' exact element={<QuestionsPage />} />              
              <Route path='/questions/:questionId' element={<QuestionPage />} />              
              <Route path='/profile' exact element={<ProfilePage />} />
              <Route path='/about' exact element={<AboutPage />} />
            </Routes>
          </Container>
          <Footer />
        </ChakraProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
