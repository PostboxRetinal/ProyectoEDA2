require('dotenv').config();
const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateJWT ;
