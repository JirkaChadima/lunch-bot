const express = require('express');
var bb = require('express-busboy');
const app = express();

const config = require('./config');
const { version } = require('../package.json');

bb.extend(app);

// Root handler
app.get('/', (req, res) => {
  res.status(200).json({
    app: 'lunch-bot',
    version,
  });
});

app.post('/', (req, res) => {
  if (!req.body.text) {
    // TODO get a list of restaurants from available drivers
    res.status(200).send('sedleri ryba krajina');
    return;
  }
  if (req.body.text === 'alcron') {
    res.status(200).send(`**${req.body.text}** neumim.`);
    return;
  }
  res.status(200).send('menu');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404);
});

module.exports = {
  app,
};

