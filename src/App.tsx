import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';
import BoardsPage from './pages/boards-page/boards-page';
import SpecifiedBoardPage from './pages/specified-bard-page/specified-board-page';

const App = () => {
  localStorage.setItem(
    'token',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI3ZjVlYTQyYjQ3OWQ0NzY5OWY2NyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NzAxNjU0NTAsImV4cCI6MTY3MDIwODY1MH0.8iNdYT_9qfydHtmzqW9PQNYs9bxGTt8dFWhWrDtRuns'
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
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
