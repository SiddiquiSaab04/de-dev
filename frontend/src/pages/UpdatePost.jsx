// src/pages/UpdatePost.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/post/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const post = res.data.data.find((p) => p._id === id);
      if (post) {
        setFormData({ title: post.title, description: post.description });
      } else {
        alert("Post not found");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:3000/post/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post updated!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
