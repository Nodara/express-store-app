const process = require('process');
const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const { userId } = jwt.verify(
      token,
      process.env.SECRET,);

    req.user = {
      userId
    };

    return next();
  } catch (e) {
    // console.log(e);
    return res
      .status(401)
      .json({ message: 'UNAUTHORIZED' });
  }
};

module.exports = checkAuth;