require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));
  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});