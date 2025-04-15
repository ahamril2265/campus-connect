import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddClub() {
  const [club, setClub] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClub({ ...club, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/clubs/add', club);
      alert('Club added successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Error adding club');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add New Club 🏷️ (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Club Name"
          onChange={handleChange}
          value={club.name}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Club Description"
          onChange={handleChange}
          value={club.description}
          required
        /><br />

        <button type="submit">Add Club</button>
      </form>
    </div>
  );
}

export default AddClub;
