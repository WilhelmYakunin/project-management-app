import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
