import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react'; // Importing Lucide icons


const Login = () => {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Navigate hook for redirecting after login
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store the token
      navigate('/tasks'); // Redirect to tasks page
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('/src/assets/Bg-01.jpg')" }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        {/* Form to log in a user */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        {/* "Not Registered?" Button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not registered yet?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
