import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register'); // Redirect to register page when button is clicked
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-blue-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/Bg-01.jpg')" }} // Path to your background image
    >
      <div className="text-center bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to Task Manager</h1>
        <p className="text-xl text-gray-600 mb-6">
          Organize and manage your tasks efficiently. Get started by creating an account!
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
