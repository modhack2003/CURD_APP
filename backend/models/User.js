// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    console.log('Original password:', this.password);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed password:', this.password);
  }
  next();
});


module.exports = mongoose.model('User', UserSchema);
