import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';
import { AuthWrapper } from './components/Auth/Auth';
import BoardsPage from './pages/boards-page/boards-page';
import SpecifiedBoardPage from './pages/specified-bard-page/specified-board-page';
import { NotFound } from './pages/404/404';

const App = () => {
  localStorage.setItem(
    'token',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI3ZjVlYTQyYjQ3OWQ0NzY5OWY2NyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NzAwNzM5NzgsImV4cCI6MTY3MDExNzE3OH0.rVT1RZhBmBfPDuon2O_qWMftiAiUkpiOIXGngEyPsiU'
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/project-management-app/" element={<WelcomPage />} />
        <Route path="/project-management-app/404" element={<NotFound />} />
        <Route element={<AuthWrapper />}>
          <Route path="/project-management-app/boards" element={<BoardsPage />} />
          <Route path="/project-management-app/boards/:id" element={<SpecifiedBoardPage />} />
        </Route>
        <Route path="/project-management-app/SignIn" element={<SignIn />} />
        <Route path="/project-management-app/SignUp" element={<SignUp />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
