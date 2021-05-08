const express = require("express");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const router = express.Router();
const UserModel = require("../models/UserModel");
const {
  UserRegisterationValidator,
  UserLoginValidator,
} = require("../validation/UserValidation");

const SALT = bycrypt.genSaltSync(process.env.SALT_SIZE);

router.post("/login", async (req, res) => {
  const { value, error: errors } = UserLoginValidator(req.body);
  console.log(value, errors);

  if (errors) {
    return res.status(400).send({ error: errors.details[0].message });
  }
  let user = await UserModel.findOne({ rollNumber: value.rollNumber });
  if (!user) {
    return res.status(401).send({ error: "No such user exists." });
  }

  const passwordMatched = await bycrypt.compare(value.password, user.password);
  if (!passwordMatched) {
    return res
      .status(401)
      .send({ error: "The password provided was incorrect" });
  }

  customUser = {
    name: user.name,
    email: user.email,
    rollNumber: user.rollNumber,
  };
  const token = jwt.sign(customUser, process.env.SALT, { expiresIn: "3h" });
  res.header().send({ token, user: customUser });
});

router.post("/register", async (req, res) => {
  const { value, error: errors } = UserRegisterationValidator(req.body);
  if (errors) {
    return res.status(400).send(errors.details[0].message);
  }
  let user = await UserModel.findOne({ email: value.email });
  if (user) {
    return res
      .status(400)
      .send({ error: "A user with that email already exists." });
  }

  const hashedPassword = await bycrypt.hash(value.password, SALT);
  const count = (await UserModel.find().countDocuments()) + 1;
  const rollNumber = ("000000" + count).slice(-6);
  user = new UserModel({ ...value, password: hashedPassword, rollNumber });
  res.status(201).send(await user.save());
});

module.exports.UserRoute = router;
