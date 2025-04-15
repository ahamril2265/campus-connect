const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Club (Admin only)
router.post('/add', (req, res) => {
  const { name, description } = req.body;
  const sql = 'INSERT INTO clubs (name, description) VALUES (?, ?)';
  db.query(sql, [name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Club added successfully' });
  });
});

// View All Clubs
router.get('/all', (req, res) => {
  db.query('SELECT * FROM clubs', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// Join Club (Student)
router.post('/join', (req, res) => {
  const { user_id, club_id } = req.body;

  const sql = 'INSERT INTO club_members (user_id, club_id) VALUES (?, ?)';
  db.query(sql, [user_id, club_id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'You have already joined this club!' });
      }
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: 'Joined club successfully' });
  });
});



// View Joined Clubs by User
router.get('/myclubs/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT c.id, c.name, c.description
    FROM clubs c
    JOIN club_members m ON c.id = m.club_id
    WHERE m.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

module.exports = router;
