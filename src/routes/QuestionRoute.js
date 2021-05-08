const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/QuestionModel");
const {
  QuestionsRegisterationValidator,
  QuestionSubmissionValidator,
} = require("../validation/QuestionValidation");

router.get("/", async (req, res) => {
  const questions = await QuestionModel.find().catch((e) =>
    console.log("An error has occurred")
  );
  return res.send(questions);
});

router.get("/:id", async (req, res) => {
  const question = await QuestionModel.findOne({
    id: req.params.id,
  }).catch((e) => console.log("An error occurred", e));
  if (!question) {
    return res.status(404).send({ error: "The question is not found" });
  }
  return res.send(question);
});

router.post("/", async (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  const { value, error: errors } = QuestionsRegisterationValidator(requestBody);
  if (errors) {
    return res.status(400).send(errors.details[0].message);
  }
  const isPresent = await QuestionModel.findOne({
    question: value.question,
    subject: value.subject,
    imageURL: value.imageURL,
  });
  if (isPresent) {
    return res
      .status(400)
      .send({ error: "This question already exists in the database" });
  }
  const count = await QuestionModel.countDocuments();

  const question = new QuestionModel({ ...value, id: count + 1 });
  const savedQuestion = await question.save().catch((e) => console.log(e));
  return res.status(201).send(savedQuestion);
});

router.post("/submit", async (req, res) => {
  const requestBody = req.body;
  const { value, error: errors } = QuestionSubmissionValidator(requestBody);
  if (errors) {
    return res.status(400).send(errors.details[0].message);
  }

  let correct = 0;
  let total = 0;

  for (questionNumber in value.result) {
    total++;
    question = await QuestionModel.findOne({ id: parseInt(questionNumber) });
    if (question.correctOption === value.result[parseInt(questionNumber)]) {
      correct++;
    }
  }
  return res.status(200).send({ correct, total });
});

module.exports.QuestionRoute = router;
