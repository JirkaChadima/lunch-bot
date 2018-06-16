let localConfig = {};
if (process.env.NODE_ENV !== 'test') {
  localConfig = require('./config.local');
}

module.exports = Object.assign({
  port: 8080,
  drivers: [],
  restaurants: [],
}, localConfig);
