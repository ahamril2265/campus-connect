import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAnnouncement() {
  const [form, setForm] = useState({ title: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/announcements/add', form);
      alert('Announcement posted!');
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to post!');
    }
  };

  return (
    <div className="container">
      <h2>Post Announcement 📢</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <br>
        </br>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default AddAnnouncement;
