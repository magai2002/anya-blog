import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const data = postSnap.data();
        setPost(data);
        setTitle(data.title);
        setCategory(data.category);
        setThumbnail(data.thumbnail);
        setContent(data.content);
      } else {
        alert('Post not found');
        navigate('/admin');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'posts', id), { title, category, thumbnail, content });
      alert('Post updated successfully');
      navigate('/admin');
    } catch (err) {
      console.error('Error updating post:', err.message);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label className="block font-medium">Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          {thumbnail && <img src={thumbnail} alt="Thumbnail preview" className="w-full h-48 object-cover mt-2 rounded-md" />}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-medium">Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        {/* Update Button */}
        <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
