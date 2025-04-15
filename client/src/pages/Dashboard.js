import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [eventCount, setEventCount] = useState(0);
  const [clubCount, setClubCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:5000/api/events/registered/${user.id}`)
        .then(res => setEventCount(res.data.length))
        .catch(err => console.error(err));

      axios.get(`http://localhost:5000/api/clubs/myclubs/${user.id}`)
        .then(res => setClubCount(res.data.length))
        .catch(err => console.error(err));
    }
  }, [user?.id]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/announcements/all')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this announcement?')) {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleEdit = (ann) => {
    const title = prompt('New title', ann.title);
    const message = prompt('New message', ann.message);
    if (title && message) {
      axios.put(`http://localhost:5000/api/announcements/${ann.id}`, { title, message })
        .then(() => {
          setAnnouncements(prev => prev.map(a => a.id === ann.id ? { ...a, title, message } : a));
        });
    }
  };

  return (
    <div className="container">
      <h2>{greeting}, {user?.name} 👋</h2>
      <p>You're logged in as <strong>{user?.role}</strong>.</p>

      <div className="card">
        <h3>📊 Your Stats</h3>
        <p>🎟️ Events Registered: <strong>{eventCount}</strong></p>
        <p>🧑‍🤝‍🧑 Clubs Joined: <strong>{clubCount}</strong></p>
      </div>

      <h3>⚡ Quick Actions</h3>
      <div className="container">
        <button onClick={() => navigate('/my-events')}>My Events</button>
        <button onClick={() => navigate('/my-clubs')}>My Clubs</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => navigate('/events')}>Browse Events</button>
        <button onClick={() => navigate('/clubs')}>Browse Clubs</button>
        {user?.role === 'admin' && (
          <>
            <button onClick={() => navigate('/add-event')}>Add Event</button>
            <button onClick={() => navigate('/add-club')}>Add Club</button>
            <button onClick={() => navigate('/add-announcement')}>Add Announcement</button>
          </>
        )}
      </div>

      <h3>📢 Announcements</h3>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map(ann => (
          <div key={ann.id} className="card">
            <h4>{ann.title}</h4>
            <p>{ann.message}</p>
            <p><small>Posted on: {new Date(ann.posted_on).toLocaleString()}</small></p>
            {user?.role === 'admin' && (
              <>
                <button onClick={() => handleEdit(ann)}>Edit</button>
                <button onClick={() => handleDelete(ann.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
