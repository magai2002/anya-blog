import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1
            className="text-3xl font-semibold cursor-pointer text-gray-800 hover:text-yellow-600"
            onClick={() => navigate('/')}
          >
            Annie Reviews
          </h1>
          <nav className="space-x-6">
            <button onClick={() => navigate('/about')} className="text-gray-600 hover:text-yellow-600 font-medium">
              About
            </button>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-yellow-600 font-medium">
              Home
            </button>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-yellow-600 font-medium">
              Movies
            </button>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-yellow-600 font-medium">
              Books
            </button>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-yellow-600 font-medium">
              Series
            </button>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-yellow-600 font-medium">
              K-Dramas
            </button>
            {user && (
              <>
                <button onClick={() => navigate('/admin')} className="text-gray-600 hover:text-yellow-600 font-medium">
                  Admin Dashboard
                </button>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 font-medium">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
          <div className="flex space-x-6">
            <a onClick={() => navigate('/about')} className="text-gray-400 hover:text-white cursor-pointer">
              About
            </a>
            {!user && (
              <a onClick={() => navigate('/login')} className="text-gray-400 hover:text-white cursor-pointer">
                Login as Author
              </a>
            )}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://x.com/anniecuteddy?s=21&t=yGrhQYPVlqFWxvobCQjRUw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="https://www.instagram.com/anyacuteddy?igsh=cnpjZDcxMTNwNmRv&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="http://linkedin.com/in/anna-ma-13a06j" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="mailto:annamagai13@gmail.com" className="text-white hover:text-red-500">
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
