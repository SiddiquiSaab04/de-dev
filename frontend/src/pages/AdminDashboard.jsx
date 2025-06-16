// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/post/getPosts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/post/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={() => navigate("/create-post")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Post
        </button>
      </div>

      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded mb-4">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p>{post.description}</p>
          <p className="text-sm text-gray-500">Created By: {post.createdBy}</p>
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => navigate(`/update-post/${post._id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
