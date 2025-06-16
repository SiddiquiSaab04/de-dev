import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/post/getPosts');
        
        // Check if backend is sending data in "data.data"
        const postsArray = Array.isArray(res.data) ? res.data : res.data.data;
        
        setPosts(postsArray || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setPosts([]);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              description={post.description}
              // Optional: image={post.image}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
