const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Needed for Neon & other hosted DBs
  }
});

pool.connect()
  .then(() => console.log('PostgreSQL connected ✅'))
  .catch(err => console.error('PostgreSQL connection error:', err));

module.exports = pool;
