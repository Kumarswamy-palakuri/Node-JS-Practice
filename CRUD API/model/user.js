const mongoose = require('mongoose');

// Define the User schema
const name = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
      type: String,
      required: true,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('user', name);
