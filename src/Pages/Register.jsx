import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react'; // Importing Lucide icons
import axios from 'axios';

const Register = () => {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Navigate hook for redirecting after registration
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      alert('Registration successful');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        {/* Form to register a new user */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <User className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full ml-2 p-2 border-0 focus:ring-0"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full ml-2 p-2 border-0 focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>

        {/* "Already Registered?" Button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
