import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        category,
        thumbnail,
        content,
        author: auth.currentUser?.email || 'Unknown',
        createdAt: new Date(),
      });
      alert('Blog post added successfully');
      navigate('/admin');
    } catch (err) {
      console.error('Error adding blog post:', err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleAddPost} className="space-y-6">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <ReactQuill value={content} onChange={setContent} placeholder="Write your post content here..." />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default NewPost;
