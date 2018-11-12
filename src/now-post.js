const resolver = require('./resolver');

module.exports = async (req, res) => {
  res.end(await resolver.resolve(req.body.text));
}
