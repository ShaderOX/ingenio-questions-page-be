const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  value: {
    type: String,
    min: 8,
    max: 1024,
    required: true,
  },
});

const QuestionSchema = new mongoose.Schema({
  subject: {
    type: String,
    max: 256,
    required: true,
  },
  question: {
    type: String,
    max: 102_400,
    required: true,
  },
  imageURL: {
    type: String,
    max: 1024,
    required: true,
  },
  options: {
    type: [OptionSchema],
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
