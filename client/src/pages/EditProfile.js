import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function EditProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...user, name, email };
    localStorage.setItem('user', JSON.stringify(updated));
    alert('Saved locally!');
    navigate('/dashboard');
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/events/registered/${user.id}`);
    .then(res => setEvents(res.data))
      .catch(err => console.error(err));

      axios.get(`${process.env.REACT_APP_API_BASE}/clubs/myclubs/${user.id}`);
      .then(res => setClubs(res.data))
      .catch(err => console.error(err));
  }, [user.id]);

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <br>
        </br>
        <button type="submit">Save</button>
      </form>

      <h3>📜 Activity Log</h3>
      <ul>
        {events.map(e => <li key={`e-${e.id}`}>Registered: {e.title}</li>)}
        {clubs.map(c => <li key={`c-${c.id}`}>Joined: {c.name}</li>)}
      </ul>
    </div>
  );
}

export default EditProfile;
