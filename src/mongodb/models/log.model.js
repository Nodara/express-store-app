const mongoose = require('mongoose');
const { Schema } = mongoose;


const logSchema = new Schema({
  actionType: {
    type: String,
    enum: ['DELETED', 'UPDATED', 'CREATED']
  },
  dataType: {
    type: String,
    enum: ['PRODUCT', 'REGION', 'STORE', 'USER']
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: Number,
  previousValue: String,
  currentValue: String,
  fieldType: String
});

module.exports = mongoose.model('Log', logSchema);