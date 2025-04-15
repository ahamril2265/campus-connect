import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventPage() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/events/all`)
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const registerEvent = async (eventId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/events/register`, {
        user_id: user.id,         // ✅ Corrected: use user.id
        event_id: eventId         // ✅ Corrected: use eventId from parameter
      });
      alert('Registered for event!');
    } catch (err) {
      alert('Already registered or error!');
    }
  };

  return (
    <div className="container">
      <h2>Upcoming Events 📅</h2>
      {events.map(event => (
        <div className="card" key={event.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{event.title}</h3>
          <p>{event.date} @ {event.location}</p>
          <p>{event.description}</p>
          <button onClick={() => registerEvent(event.id)}>Register</button>
        </div>
      ))}
    </div>
  );
}

export default EventPage;
