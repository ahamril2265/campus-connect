import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEvent() {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/events/add`, event);
      alert('Event added successfully!');
      navigate('/events');
    } catch (err) {
      alert('Failed to add event!');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add New Event 📅 (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          required
        /><br />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
