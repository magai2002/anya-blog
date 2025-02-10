import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Fetch a single post
  const fetchPost = async () => {
    try {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.error('No such post!');
      }
    } catch (err) {
      console.error('Error fetching post:', err.message);
    }
  };

  // Disable copy functionality and text selection
  useEffect(() => {
    const preventCopy = (e) => {
      e.preventDefault();
    };

    // Disable text selection using CSS
    const disableTextSelection = () => {
      document.body.style.userSelect = 'none';
    };

    // Add event listener to prevent copy action
    document.addEventListener('copy', preventCopy);
    disableTextSelection();

    // Cleanup the effect on component unmount
    return () => {
      document.removeEventListener('copy', preventCopy);
      document.body.style.userSelect = ''; // Reset the user-select style
    };
  }, []);

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded-md mb-6" />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">By {post.author} - {post.category}</p>
      <div className="prose">{post.content}</div>
    </div>
  );
};

export default PostDetail;
