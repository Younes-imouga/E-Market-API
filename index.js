require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const notFound = require('./controllers/notFound');
const logger = require('./controllers/middlewares/logger');
const errorHandler = require('./controllers/middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(notFound);
app.use(errorHandler);

app.use('/', router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));
  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});