import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Tasks from './Pages/Tasks';
import Home from './Pages/Home';  // Import Home Page
import Footer from './Pages/Footer';
import Header from './Pages/Header';

const App = () => {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
