const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const allowedOrigins = ['https://campusconnect.vercel.app'];
const eventRoutes = require('./routes/events');
const clubRoutes = require('./routes/clubs');
const announcementRoutes = require('./routes/announcements');
const userRoutes = require('./routes/users');
require('dotenv').config();

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you're using cookies/auth
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
