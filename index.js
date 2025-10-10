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

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// log all requests
app.use(logger);

// swager initialisation
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My REST API',
      version: '1.0.0',
      description: 'Simple Express REST API with Swagger docs',
    },
    servers: [
      { url: 'http://localhost:3000' },
    ], 
  },
  apis: ['./routes/*.js', './controllers/*.js'], 
};

// swager route docs
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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