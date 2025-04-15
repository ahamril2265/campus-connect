import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/update-password', {
        user_id: user.id,
        oldPassword,
        newPassword
      });
      alert('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password 🔐</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
