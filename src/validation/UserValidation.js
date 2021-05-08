const Joi = require("joi");

const UserLoginValidation = Joi.object({
  rollNumber: Joi.string().min(6).max(6).required(),
  password: Joi.string().max(256).required(),
});

const UserRegisterationValidation = Joi.object({
  name: Joi.string().max(256).required(),
  email: Joi.string().email().max(256).required(),
  password: Joi.string().max(256).required(),
});

module.exports.UserRegisterationValidator = (data) => {
  return UserRegisterationValidation.validate(data);
};

module.exports.UserLoginValidator = (data) => {
  return UserLoginValidation.validate(data);
};
