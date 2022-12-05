import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';
import { AuthWrapper } from './components/Auth/Auth';
import BoardsPage from './pages/boards-page/boards-page';
import SpecifiedBoardPage from './pages/specified-bard-page/specified-board-page';

const App = () => {
  localStorage.setItem(
    'token',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI3ZjVlYTQyYjQ3OWQ0NzY5OWY2NyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NzAwNzM5NzgsImV4cCI6MTY3MDExNzE3OH0.rVT1RZhBmBfPDuon2O_qWMftiAiUkpiOIXGngEyPsiU'
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/project-management-app/" element={<WelcomPage />} />
        </Route>
        <Route path="/project-management-app/SignIn" element={<SignIn />} />
        <Route path="/project-management-app/SignUp" element={<SignUp />} />
      </Routes>

      <NavLink end to="/boards">
        BoardsPage
      </NavLink>
      <Routes>
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:id" element={<SpecifiedBoardPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
