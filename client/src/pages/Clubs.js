import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/clubs/all`);
    .then(res => setClubs(res.data))
      .catch(err => console.error('Error fetching clubs:', err));
  }, []);

  const handleJoin = async (clubId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/clubs/join`, {        user_id: user.id,
        club_id: clubId
      });
      alert('Successfully joined the club!');
    } catch (err) {
      alert('Error joining club or already joined.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>All Clubs 🧑‍🤝‍🧑</h2>
      {clubs.length === 0 ? (
        <p>No clubs found.</p>
      ) : (
        clubs.map(club => (
          <div className="card" key={club.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <h3>{club.name}</h3>
            <p>{club.description}</p>
            <button onClick={() => handleJoin(club.id)}>Join Club</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Clubs;
