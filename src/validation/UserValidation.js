const Joi = require("joi");

const UserRegisterationValidation = Joi.object({
  name: Joi.string().max(256).required(),
  email: Joi.string().email().max(256).required(),
  password: Joi.string().max(256).required(),
});

module.exports.UserRegisterationValidator = (data) => {
  return UserRegisterationValidation.validate(data);
};
