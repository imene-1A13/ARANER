import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/login.css';
import logo from '../assets/logo2.png';
import logo1 from '../assets/logoArz.png';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`container bg-white rounded-lg shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[600px] ${isSignUp ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className={`form-container absolute top-0 h-full w-1/2 transition-all duration-600 ease-in-out left-0 opacity-0 z-1 sign-up-container ${isSignUp ? 'translate-x-full opacity-100 z-50' : ''}`}>
          <form className="bg-white flex items-center justify-center flex-col p-12 h-full text-center">
            <h1 className="font-bold text-2xl mb-4">Create Account</h1>
            <div className="social-container my-5 flex gap-2">
            </div>
            <input type="text" placeholder="Matricule" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <input type="email" placeholder="Email" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <input type="password" placeholder="Password" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <input type="password" placeholder="Confirm Password" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <button type="submit" className="mt-4 bg-yellow-300 text-white rounded-full px-12 py-3 font-bold uppercase tracking-wide transition-transform hover:bg-yellow-400" style={{marginTop:'2rem'}}>
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`form-container absolute top-0 h-full w-1/2 transition-all duration-600 ease-in-out left-0 z-2 sign-in-container ${isSignUp ? 'translate-x-full opacity-0 z-1' : ''}`}>
          <form onSubmit={handleSignInSubmit} className="bg-white flex items-center justify-center flex-col p-12 h-full text-center">
            <h1 className="font-bold text-2xl mb-4">Sign In</h1>
            <input type="email" placeholder="Matricule" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <input type="password" placeholder="Mot de passe" className="bg-gray-100 border-none p-3 mb-2 w-full rounded" />
            <a href="#" className="text-yellow-300 text-sm mt-4 mb-6">Mot de passe oublié?</a>
            <button type="submit" className="bg-yellow-300 text-white rounded-full px-12 py-3 font-bold uppercase tracking-wide transition-transform hover:bg-yellow-400">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100">
          <div className={`overlay bg-gradient-to-r from-yellow-300 to-yellow-300 relative -left-full h-full w-[200%] transform ${isSignUp ? 'translate-x-0' : '-translate-x-1/2'} transition-transform duration-600 ease-in-out`}>
            <div className="overlay-panel overlay-left absolute flex items-center justify-center flex-col p-8 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out">
              <img src={logo1} alt="Logo" className="w-full p-16" />
              <button onClick={handleSignIn} className="ghost bg-transparent border border-white text-white rounded-full px-12 py-3 font-bold uppercase tracking-wide transition-transform hover:bg-white/10">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right absolute flex items-center justify-center flex-col p-8 text-center top-0 h-full w-1/2 right-0 transform transition-transform duration-600 ease-in-out">
              <img src={logo} alt="Logo" style={{width:'25vw',marginRight:'1rem',      marginBottom: '4rem' // Add space below the logo
}} />
              <h1 className="text-white font-bold text-2xl mb-4">Hello!</h1>
              <button onClick={handleSignUp} className="ghost bg-transparent border border-white text-white rounded-full px-12 py-3 font-bold uppercase tracking-wide transition-transform hover:bg-white/10">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;