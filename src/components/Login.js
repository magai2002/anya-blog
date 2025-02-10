import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google Sign-in successful');
      navigate('/')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn-primary">Login with Email</button>
      </form>

      <div className="mt-6">
        <button onClick={handleGoogleSignIn} className="btn-primary w-full">
          Sign in with Google
        </button>
      </div>

      {/* Link to Register Page */}
      <div className="mt-4 text-center">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/register" className="text-blue-600 underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
