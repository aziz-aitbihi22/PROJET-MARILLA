const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/marilla_db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ DB Error:', err));

app.get('/', (req, res) => res.send('Marilla API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));