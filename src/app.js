const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

// Routes
const { QuestionRoute } = require("./routes/QuestionRoute");
const { UserRoute } = require("./routes/UserRoute");

const PORT = parseInt(process.env.PORT) || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION;

const app = express();
app.use(express.json());

// Setting up the routes
app.use("/api/questions", QuestionRoute);
app.use("/auth/user", UserRoute);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT} ...`));

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (error) =>
  console.log(!error ? "Connected to MongoDB..." : error)
);
