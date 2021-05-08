const express = require("express");
const { verifyToken } = require("../verification/JWTVerification");
const router = express.Router();

router.post("/token", (req, res) => {
  const token = req.body.token;
  console.log("Token sent was", token);
  if (verifyToken(token)) {
    return res.send({ message: "The token is valid" });
  }
  return res.status(401).send({ error: "The token is invalid" });
});

module.exports.VerificationRoute = router;
