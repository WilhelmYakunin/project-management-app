import React from 'react';
import './App.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './rollbar';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Header } from './components/Header/Header';
import ModalForm from './features/modals/modalForm';
import { Footer } from './components/Footer/Footer';

import BoardsPage from './pages/boards-page/boards-page';
import SpecifiedBoardPage from './pages/specified-bard-page/specified-board-page';

const App = () => {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Router basename='/project-management-app'>
          <Header />
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
          <NavLink end to="/boards"></NavLink>
          <Routes>
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<SpecifiedBoardPage />} />
          </Routes>

          <ModalForm />
          <Footer />
        </Router>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
