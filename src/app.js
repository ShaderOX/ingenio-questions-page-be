const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const PORT = parseInt(process.env.PORT) || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello, World");
});

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT} ...`)
);

mongoose.connect(
  DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => console.log(!error ? "Connected to MongoDB..." : error)
);
