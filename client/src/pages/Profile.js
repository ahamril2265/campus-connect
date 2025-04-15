import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${process.env.REACT_APP_API_BASE}/events/registered/${user.id}`)
      .then(res => setEvents(res.data))
      .catch(err => console.error('Event fetch error:', err));

      axios.get(`${process.env.REACT_APP_API_BASE}/clubs/myclubs/${user.id}`)
      .then(res => setClubs(res.data))
      .catch(err => console.error('Club fetch error:', err));
  }, [user?.id]);

  return (
    <div className="container">
      <h2>👤 Profile</h2>
      <div className="card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <h3>🎟️ Registered Events</h3>
      {events.length === 0 ? <p>No events registered.</p> :
        events.map(ev => (
          <div key={ev.id} className="card">
            <h4>{ev.title}</h4>
            <p>{ev.date} @ {ev.location}</p>
          </div>
        ))
      }

      <h3>🧑‍🤝‍🧑 Joined Clubs</h3>
      {clubs.length === 0 ? <p>No clubs joined.</p> :
        clubs.map(club => (
          <div key={club.id} className="card">
            <h4>{club.name}</h4>
            <p>{club.description}</p>
          </div>
        ))
      }
      <button onClick={() => window.location.href = '/edit-profile'}>Edit Profile</button>
    </div>
  );
}

export default Profile;
