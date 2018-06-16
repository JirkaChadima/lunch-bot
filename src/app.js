const express = require('express');
var bb = require('express-busboy');
const app = express();

const { name, version } = require('../package.json');
const resolver = require('./resolver');

bb.extend(app);

// Root handler
app.get('/', (req, res) => {
  res.status(200).json({
    app: name,
    version,
  });
});

app.post('/', async (req, res) => {
  res.status(200).send(await resolver.resolve(req.body.text));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404);
});

module.exports = {
  app,
};
