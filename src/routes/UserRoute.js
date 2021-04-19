const express = require("express");
const bycrypt = require("bcryptjs");
const router = express.Router();
const UserModel = require("../models/UserModel");
const { UserRegisterationValidator } = require("../validation/UserValidation");

const SALT = bycrypt.genSaltSync(process.env.SALT);

router.post("/register", async (req, res) => {
  const { value, error: errors } = UserRegisterationValidator(req.body);
  if (errors) {
    return res.status(400).send(errors.details[0].message);
  }
  let user = await UserModel.findOne({ email: value.email });
  if (user) {
    return res.status(400).send({ error: "A user with that email already exists." });
  }

  const hashedPassword = await bycrypt.hash(value.password, SALT);
  const count = (await UserModel.find().countDocuments()) + 1;
  const rollNumber = ("000000" + count).slice(-6);
  user = new UserModel({ ...value, password: hashedPassword, rollNumber });
  res.status(201).send(await user.save());
});

module.exports.UserRoute = router;
