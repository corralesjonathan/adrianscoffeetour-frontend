import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Admin Login Component
 *
 * A split-screen login component with a hero background on the left side
 * and a login form on the right side. Styling follows the application's design system.
 *
 * @component
 */
export const Login = ({ onSubmit, error }) => {
  // Form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identifier || !password) return;
    
    setLoading(true);
    
    try {
      // Determine if the input is an email or username
      const isEmail = identifier.includes('@');
      
      // Format credentials according to API requirements
      const credentials = isEmail
        ? { email: identifier, password }
        : { username: identifier, password };
      
      // Submit credentials to parent component
      if (onSubmit) {
        await onSubmit(credentials);
      }
    } catch (err) {
      console.error('Error in login form submission:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row">
      {/* Left column - Hero Background Image */}
      <div 
        className="
          hidden md:flex md:w-1/2 
          bg-[url('/imgs/hero.webp')] bg-cover bg-no-repeat bg-right 
          relative
        "
      >

        {/* Logo */}
        <Link to="/">
            <img src="./imgs/logo.svg" alt="Logo"
            className="
            z-[2] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-[400px] max-sm:w-[200px]
            " />
        </Link>

        {/* Background overlay for better text contrast */}
        <div className="absolute inset-0 bg-white/60" />
      </div>
      
      {/* Right column - Login Form */}
      <div className="
        w-full md:w-1/2 
        bg-white 
        flex flex-col justify-center items-center
        px-8 py-12 md:px-16 lg:px-24
      ">
        <div className="w-full max-w-md">
          {/* Login Header */}
          <h1 
            className="
              text-3xl font-bold mb-8 text-adrians-red 
              text-center md:text-left
            "
          >
            Login
          </h1>
          
          {/* Error message */}
          {error && (
            <div className="p-4 mb-6 bg-red-50 rounded-[15px] text-red-700">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Field */}
            <div>
              <label 
                htmlFor="identifier" 
                className="block text-sm font-medium text-adrians-brown mb-1"
              >
                Username / Email
              </label>
              <input 
                type="text" 
                id="identifier"
                className="
                  w-full p-3 
                  border border-adrians-brown/30 
                  rounded-full 
                  focus:outline-none focus:ring-2 
                  focus:ring-adrians-red focus:border-transparent 
                  transition-all duration-300
                "
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-adrians-brown mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  className="
                    w-full p-3 
                    border border-adrians-brown/30 
                    rounded-full 
                    focus:outline-none focus:ring-2 
                    focus:ring-adrians-red focus:border-transparent 
                    transition-all duration-300
                  "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="
                    absolute right-4 top-1/2 transform -translate-y-1/2
                    text-adrians-brown/70 hover:text-adrians-red
                    transition-colors duration-200
                    focus:outline-none
                  "
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    /* Eye crossed icon (hide password) */
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    /* Eye icon (show password) */
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a 
                href="#" 
                className="
                  text-sm text-adrians-red 
                  hover:underline hover:text-adrians-red/80 
                  transition-all duration-300
                "
              >
                Forgot your Password?
              </a>
            </div>
            
            {/* Login Button */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="
                  cursor-pointer
                  w-full py-3 px-6 
                  bg-adrians-red text-white 
                  rounded-full 
                  hover:bg-adrians-red/90 
                  transition-all duration-300 
                  font-medium 
                  shadow-adrians-btn-shadow 
                  hover:shadow-adrians-btn-shadow-hover 
                  hover:scale-105 
                  flex items-center justify-center
                  ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                "
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking and documentation
Login.propTypes = {
  /** Function called on form submission with form data */
  onSubmit: PropTypes.func,
  /** Error message to display */
  error: PropTypes.string
};

// Default props
Login.defaultProps = {
  onSubmit: null,
  error: ''
};
