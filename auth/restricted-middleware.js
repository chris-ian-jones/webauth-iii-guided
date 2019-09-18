const jwt = require('jsonwebtoken')
const secrets = require('./../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        // token invalid or expired
        res.status(401).json({ message: 'You shall not pass' })
      } else {
        // token is valid
        // maybe add the user to the req object
        req.user = { username: decodedToken.username }
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'no credentials provided' })
  }
};