import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import { useTheme } from '../../themeContext';
import { FaUser, FaLock } from 'react-icons/fa'; 
import { CiUser } from "react-icons/ci";

function LoginPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate(); // Initializing the navigate function

  const handleLogin = (e, role) => {
    e.preventDefault();
    // Navigate based on the role
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'user') {
      navigate('/main');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className={`p-10 rounded-lg shadow-lg max-w-md w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="text-center mb-8">
          <CiUser className={`mx-auto text-6xl ${theme === 'light' ? 'text-gray-400' : 'text-white'}`} />
          <h1 className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-blue-500' : 'text-white'}`}>
            Welcome Back!
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Please login to your account
          </p>
        </div>
        <form>
          <div className="mb-4 relative">
            <label className={`block mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="username">
              Username
            </label>
            <div className={`flex items-center border rounded px-3 py-2 ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}>
              <FaUser className={`mr-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-300'}`} />
              <input
                className={`w-full focus:outline-none ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-300'}`}
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <label className={`block mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="password">
              Password
            </label>
            <div className={`flex items-center border rounded px-3 py-2 ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}>
              <FaLock className={`mr-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-300'}`} />
              <input
                className={`w-full focus:outline-none ${theme === 'light' ? 'bg-white text-gray-700' : 'bg-gray-800 text-gray-300'}`}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className={`px-4 py-2 rounded transition duration-300 ${theme === 'light' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
              type="button"
              onClick={(e) => handleLogin(e, 'user')}
            >
              User Login
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-300 ${theme === 'light' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}`}
              type="button"
              onClick={(e) => handleLogin(e, 'admin')}
            >
              Admin Login
            </button>
            <a
              href="#"
              className={`transition duration-300 ${theme === 'light' ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300 hover:text-gray-400'}`}
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <button
              className={`transition duration-300 ${theme === 'light' ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300 hover:text-gray-400'}`}
              type="button"
              onClick={toggleTheme}
            >
              Toggle Theme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
