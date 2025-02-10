import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminAddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Fetch current user's role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setError('User data not found');
        }
      }
    };
    fetchUserRole();
  }, []);

  // Handle adding a new post
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (role !== 'author') {
      setError('You do not have permission to add posts.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        category,
        thumbnail,
        author,
        comments: [],
        createdAt: new Date(),
      });
      alert('Blog post added successfully');
      setTitle('');
      setContent('');
      setCategory('');
      setThumbnail('');
      setAuthor('');
    } catch (err) {
      setError('Error adding blog post: ' + err.message);
    }
  };

  if (role !== 'author') {
    return <p className="text-red-500">You do not have permission to add posts.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Blog Post</h1>
      <form onSubmit={handleAddPost} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="input w-full h-32"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="input w-full"
        />
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Thumbnail URL"
          className="input w-full"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="input w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn-primary w-full">Add Post</button>
      </form>
    </div>
  );
};

export default AdminAddPost;
