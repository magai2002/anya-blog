import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAdmin(true); // Assuming all authenticated users are authors/admins
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        fetchPosts();
        alert('Post deleted successfully.');
      } catch (err) {
        console.error('Error deleting post:', err.message);
        alert('Failed to delete the post. Please try again.');
      }
    }
  };

  if (!isAdmin) {
    return <p className="text-red-500">You do not have permission to access this page.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button 
        onClick={() => navigate('/new-post')}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-green-600"
      >
        Add New Post
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-700 mb-2">{post.category}</p>
            <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover mb-4 rounded-md" />
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/edit-post/${post.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
