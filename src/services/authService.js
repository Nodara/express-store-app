const User = require('../db/models/user.model');
const process = require('process');
const jwt = require('jsonwebtoken');

const login = async ({
  email, password
}) => {
  const user = await User.findOne({
    where: {
      email,
      password
    }
  });

  if (user) {
    const token = jwt
      .sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: '1m'
        }
      );

    return token;
  }
  return false;

};



module.exports = {
  login,
};