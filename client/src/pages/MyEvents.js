import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${process.env.REACT_APP_API_BASE}/events/registered/${user.id}`)
    .then(res => setMyEvents(res.data))
      .catch(err => console.error(err));
  }, [user?.id]);

  return (
    <div className="container">
      <h2>My Registered Events 📌</h2>
      {myEvents.length === 0 ? (
        <p>You haven’t registered for any events yet.</p>
      ) : (
        myEvents.map(event => (
          <div className="card" key={event.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{event.title}</h3>
            <p>{event.date} @ {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyEvents;
