// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#eee', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>

      {user && (
        <>
          <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
          <Link to="/events" style={{ marginRight: '10px' }}>Events</Link>
          <Link to="/my-events" style={{ marginRight: '10px' }}>My Events</Link>
          <Link to="/clubs" style={{ marginRight: '10px' }}>Clubs</Link>
          <Link to="/my-clubs" style={{ marginRight: '10px' }}>My Clubs</Link>
          <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
          <Link to="/change-password" style={{ marginRight: '10px' }}>Change Password</Link>
        </>
      )}

      {user?.role === 'admin' && (
        <>
          <Link to="/add-event" style={{ marginRight: '10px' }}>Add Event</Link>
          <Link to="/add-club" style={{ marginRight: '10px' }}>Add Club</Link>
          <Link to="/add-announcement" style={{ marginRight: '10px' }}>Post Announcement</Link>
        </>
      )}

      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
