// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import EventPage from './pages/EventPage';
import MyEvents from './pages/MyEvents';
import AdminRoute from './components/AdminRoute';
import AddEvent from './pages/AddEvent';
import AddClub from './pages/AddClub';
import MyClubs from './pages/MyClubs';
import Clubs from './pages/Clubs';
import Profile from './pages/Profile';
import AddAnnouncement from './pages/AddAnnouncement';
import EditProfile from './pages/EditProfile';
import AllUsers from './pages/AllUsers';
import ChangePassword from './pages/ChangePassword';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute>
        <Dashboard />
      </PrivateRoute>} />
      <Route path="/events" element={<PrivateRoute>
        <EventPage />
      </PrivateRoute>} />
      <Route path="/my-events" element={<PrivateRoute>
        <MyEvents />
      </PrivateRoute>} />
      <Route path="/add-event" element={<AdminRoute><AddEvent /></AdminRoute>} />
      
      <Route path="/add-club" element={<AdminRoute><AddClub /></AdminRoute>} />
      <Route path="/my-clubs" element={<PrivateRoute><MyClubs /></PrivateRoute>} />
      <Route path="/clubs" element={<PrivateRoute><Clubs /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/add-announcement" element={<AdminRoute><AddAnnouncement /></AdminRoute>} />
      <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
      <Route path="/all-users" element={<AdminRoute><AllUsers /></AdminRoute>} />
      <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
