const User = require('../db/models/user.model');
const process = require('process');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signale = require('signale');
const Log = require('../mongodb/models/log.model');

const login = async ({
  email, password
}) => {

  const user = await User.findOne({
    where: {
      email,
    }
  });

  const isPasswordTrue = bcrypt.compareSync(password, user.password, Number(process.env.SALT_AMOUNT));


  if (user && isPasswordTrue) {
    const token = jwt
      .sign(
        {
          userId: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: '10h'
        }
      );

    return token;
  }
  return false;

};


const register = async ({
  firstName,
  lastName,
  email,
  password
}) => {
  try {
    const hash = bcrypt.hashSync(password, Number(process.env.SALT_AMOUNT));

    await User.create({
      firstName,
      lastName,
      email,
      password: hash
    });

    const creationLog = new Log({
      actionType: 'CREATED',
      dataType: 'USER'
    });

    await creationLog.save();


    return { message: 'CREATED' };

  } catch (e) {
    signale.error('error', e);
    return { message: 'INTERNAL_SERVER_ERROR' };
  }
};



module.exports = {
  login,
  register,
};