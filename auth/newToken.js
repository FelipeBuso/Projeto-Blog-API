const jwt = require('jsonwebtoken');

const newToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  return token;
};

module.exports = newToken;