const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/announcements/add
router.post('/add', (req, res) => {
  const { title, message } = req.body;
  const sql = 'INSERT INTO announcements (title, message) VALUES (?, ?)';
  db.query(sql, [title, message], (err, result) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Announcement posted successfully' });
  });
});

// GET /api/announcements/all
router.get('/all', (req, res) => {
  const sql = 'SELECT * FROM announcements ORDER BY posted_on DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// DELETE announcement
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM announcements WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Deleted' });
    });
  });
  
  // PUT update announcement
  router.put('/:id', (req, res) => {
    const { title, message } = req.body;
    const sql = 'UPDATE announcements SET title = ?, message = ? WHERE id = ?';
    db.query(sql, [title, message, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Updated' });
    });
  });
  

module.exports = router;
