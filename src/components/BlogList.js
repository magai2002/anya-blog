import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    } catch (err) {
      console.error('Error fetching blog posts:', err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-6 bg-white rounded-md shadow-md">
              {/* Wrap the blog post with Link */}
              <Link to={`/post/${post.id}`} className="block hover:shadow-lg transition-shadow">
                <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.category}</p>
                <p>{post.content.substring(0, 100)}...</p>
                <p className="text-gray-500 mt-2">By {post.author}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
