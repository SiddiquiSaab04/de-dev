const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
