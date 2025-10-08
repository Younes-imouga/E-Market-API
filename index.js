require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const notFound = require('./controllers/middlewares/notFound');
const logger = require('./controllers/middlewares/logger');
const errorHandler = require('./controllers/middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log all requests
app.use(logger);

app.use('/', router);

// in case of a 404 error
app.use(notFound);

// handle other errors
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));
  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});