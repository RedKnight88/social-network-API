// Uses ExpressJS library for server, connects to MongoDB through config file

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Initialize server
const PORT = process.env.PORT || 3001;
const app = express();

// Some settings to enable functionality of Express, using JSON or urls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Wraps the server within the mongoDB connection and starts the application
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
