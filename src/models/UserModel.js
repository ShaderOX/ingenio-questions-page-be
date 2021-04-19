const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 256,
    required: true,
  },
  email: {
    type: String,
    max: 256,
    required: true,
  },
  rollNumber: {
    type: String,
    max: 6,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 64,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
