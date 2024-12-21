import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png' // Importing Link from react-router-dom

const Header = () => {
  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo Image with Link */}
        <div className="text-2xl font-semibold">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo} // Path to your logo image (ensure the path is correct)
              alt="Task Manager Logo"
              className="w-12 h-12"
            />
            <span>Task Manager</span>
          </Link>
        </div>

        {/* Optionally, add a tagline or description */}
        <div className="text-sm text-white opacity-70">
          <p>Organize your tasks efficiently</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
