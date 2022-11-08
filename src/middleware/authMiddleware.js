const process = require('process');
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(
    token,
    process.env.SECRET,
    (error) => {
      if (error) {
        return res.json({ message: 'Unauthorized' });
      }
    });

  return next();
};

module.exports = checkAuth;