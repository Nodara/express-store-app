const mongoose = require('mongoose');
const signale = require('signale');
const process = require('process');

const connectionString = `mongodb+srv://dba:${process.env.mongoPass}@digitaledu.tvlpzo2.mongodb.net/test`;


try {
  mongoose.connect(connectionString);
  signale.success('MONGO:Connect: Success');
} catch (e) {
  signale.error('mongoDb; error while connecting: ', e);
}

module.exports = mongoose;


