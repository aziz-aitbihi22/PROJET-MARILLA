const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Mohim bach yfham JSON
app.use(express.static(path.join(__dirname, '../public')));

// Database Connection
connectDB();

// Routes
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur خدام f l-port ${PORT} 🚀`);
});