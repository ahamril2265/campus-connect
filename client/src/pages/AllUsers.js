import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user.id} className="card">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
