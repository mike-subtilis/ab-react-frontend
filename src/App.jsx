import { ChakraProvider, Container } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthenticationProvider from './components/auth/AuthenticationProvider.jsx';

import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import initFontAwesome from './utils/initFontAwesome';

import AboutPage from './views/AboutPage.jsx';
import AnswersPage from './views/AnswersPage.jsx';
import HomePage from './views/HomePage.jsx';
import ProfilePageAuthReq from './views/ProfilePage.jsx';
import QuestionPage from './views/QuestionPage.jsx';
import QuestionsPage from './views/QuestionsPage.jsx';

// styles
import './App.css';

// fontawesome
initFontAwesome();

const App = () => {
  return <BrowserRouter>
    <div id="app" className="d-flex flex-column h-100">
      <ChakraProvider>
        <AuthenticationProvider>
          <NavBar />
          <Container maxW='100%' style={{ flexGrow: 1 }} sx={{ p: 0 }}>
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/questions' exact element={<QuestionsPage />} />
              <Route path='/questions/:questionId' element={<QuestionPage />} />
              <Route path='/answers' exact element={<AnswersPage />} />
              <Route path='/profile' exact element={<ProfilePageAuthReq />} />
              <Route path='/about' exact element={<AboutPage />} />
            </Routes>
          </Container>
          <Footer />
        </AuthenticationProvider>
      </ChakraProvider>
    </div>
  </BrowserRouter>;
};

export default App;
