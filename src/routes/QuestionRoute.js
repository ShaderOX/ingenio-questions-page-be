const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/QuestionModel");
const { QuestionsRegisterationValidator } = require("../validation/QuestionValidation");

router.get("/", async (req, res) => {
  const questions = await QuestionModel.find().catch((e) => console.log("An error has occurred"));
  console.log(questions);
  return res.send(questions);
});

router.get("/:_id", async (req, res) => {
  const question = await QuestionModel.findById(req.params._id).catch((e) =>
    console.log("An error occurred", e)
  );
  if (!question) {
    return res.status(404).send({ error: "The question is not found" });
  }
  return res.send(question);
});

router.post("/", async (req, res) => {
  const requestBody = req.body;
  const { value, error: errors } = QuestionsRegisterationValidator(requestBody);
  if (!errors) {
    return res.status(400).send(errors.details[0].message);
  }
  const isPresent = await QuestionModel.findOne({
    question: value.question,
    subject: value.subject,
    imageURL: value.imageURL,
  });
  if (isPresent) {
    return res.status(400).send({ error: "This question already exists in the database" });
  }
  const question = new QuestionModel(value);
  const savedQuestion = question.save().catch((e) => console.log(e));
  return res.status(201).send(savedQuestion);
});

module.exports.QuestionRoute = router;
