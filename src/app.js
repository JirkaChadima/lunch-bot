const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const { version } = require('../package.json');

app.use(bodyParser.json());

// Root handler
app.get('/', (req, res) => {
  const response = {
    app: 'lunch-bot',
    version,
  };
  res.status(200).json(response);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404);
});

module.exports = {
  app,
};

