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
  id: {
    type: Number,
    required: true,
  },
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
    min: 0,
    max: 1024,
    required: false,
  },
  options: {
    type: [OptionSchema],
  },
  correctOption: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
