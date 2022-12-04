import React from 'react';
import './App.css';
import { WelcomPage } from './pages/WelcomPage/WelcomPage';
import { SignIn } from './pages/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { SignUp } from './pages/SignUp/SignUp';
import { AuthWrapper } from './components/Auth/Auth';

const App = () => {
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
      <Footer />
    </Router>
  );
};

export default App;
