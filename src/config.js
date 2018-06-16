const localConfig = require('./config.local');

module.exports = Object.assign({
  port: 8080,
  drivers: [],
  restaurants: [],
}, localConfig);
