const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  emailToken:{
    type:String,
    required:true
  },
  isVarified:{
    type:Boolean,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
=======
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailToken: {
        type: String,

    },
    isVerified: {
        type: Boolean,

    },
    date: {
        type: Date,
        default: Date.now
    }
>>>>>>> 93ace32b8164c4fb0376e52c3e8f63d0cf32d63e
});

const User = mongoose.model('User', UserSchema);

module.exports = User;