const bcrypt = require('bcrypt');

// Update Password (Authenticated)
router.post('/update-password', (req, res) => {
  const { user_id, oldPassword, newPassword } = req.body;

  const getUser = 'SELECT * FROM users WHERE id = $1';
  pool.query(getUser, [user_id], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(oldPassword, results[0].password);
    if (!valid) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
    pool.query(updateQuery, [hashedNewPassword, user_id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
});

router.get('/all', (req, res) => {
    pool.query('SELECT id, name, email, role FROM users', (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json(result);
    });
  });
  