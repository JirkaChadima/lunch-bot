const { app } = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log('Server ready');
});

module.exports = server;
