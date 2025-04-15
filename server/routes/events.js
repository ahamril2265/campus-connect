const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Event (Admin)
router.post('/add', (req, res) => {
  const { title, date, location, description } = req.body;
  const sql = 'INSERT INTO events (title, date, location, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, date, location, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Event added successfully' });
  });
});

// Get All Events (Student)
router.get('/all', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// Register for Event (Student)
router.post('/register', (req, res) => {
  const { user_id, event_id } = req.body;
  const sql = 'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)';
  db.query(sql, [user_id, event_id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'You have already registered for this event!' });
      }
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Registered for event successfully' });
  });
});


// Get Registered Events for a User
router.get('/registered/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT e.id, e.title, e.date, e.location, e.description
    FROM events e
    JOIN registrations r ON e.id = r.event_id
    WHERE r.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});


module.exports = router;
