import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/cat.jpg';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/'); // Redirect to landing page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif text-gray-800">
      {/* Hero Section */}
      <section
        className="flex flex-col justify-center items-center text-center py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "800px"}}
      >
        <div className="bg-black bg-opacity-50 px-8 py-12 rounded-lg max-w-4xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-600">Annie Reviews</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Sharing insights, stories, and thoughts on various topics.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 border border-white text-white rounded-md hover:bg-yellow-600 hover:border-yellow-600"
          >
            Explore Posts
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Discover Meaningful Stories
          </h2>
          <p className="text-lg text-gray-600">
            Explore compelling articles, essays, and insights curated just for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 bg-white shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Thoughtful Content</h3>
            <p className="text-gray-600">
              Read in-depth articles on various topics and stay informed with the latest insights.
            </p>
          </div>
          <div className="p-8 bg-white shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Engaging Stories</h3>
            <p className="text-gray-600">
              Explore compelling stories and ideas that inspire and entertain.
            </p>
          </div>
          <div className="p-8 bg-white shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Join the Conversation</h3>
            <p className="text-gray-600">
              Sign up to leave comments and participate in discussions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
