import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';
import BoardsPage from './pages/boards-page/boards-page';

const App = () => {
  localStorage.setItem(
    'token',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI3ZjVlYTQyYjQ3OWQ0NzY5OWY2NyIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2NzAwMTMxODEsImV4cCI6MTY3MDA1NjM4MX0.mU2IgPVtOo-C3DIHzWdQTf2_GLaKSW45KEQQHOR6DGA'
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
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
