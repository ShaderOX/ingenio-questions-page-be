const Joi = require("joi");

const QuestionRegisterationValidation = Joi.object({
  subject: Joi.string().max(256).required(),
  question: Joi.string().max(102_400).required(),
  imageURL: Joi.string().max(1024).required().default("").allow(""),
  options: Joi.array()
    .items(
      Joi.object({
        value: Joi.string(),
      })
    )
    .length(4)
    .has(Joi.object({ value: Joi.string().max(1024).required() })),
  correctOption: Joi.string().required().max(102_400),
});

const QuestionSubmissionValidation = Joi.object({
  result: Joi.object(),
});

module.exports.QuestionsRegisterationValidator = (data) => {
  return QuestionRegisterationValidation.validate(data);
};

module.exports.QuestionSubmissionValidator = (data) => {
  return QuestionSubmissionValidation.validate(data);
};
