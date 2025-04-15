import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyClubs() {
  const [myClubs, setMyClubs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${process.env.REACT_APP_API_BASE}/clubs/myclubs/${user.id}`)
      .then(res => setMyClubs(res.data))
      .catch(err => console.error(err));
  }, [user?.id]);

  return (
    <div className="container">
      <h2>My Clubs 🧑‍🤝‍🧑</h2>
      {myClubs.length === 0 ? (
        <p>You haven’t joined any clubs yet.</p>
      ) : (
        myClubs.map(club => (
          <div className="card" key={club.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{club.name}</h3>
            <p>{club.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyClubs;
