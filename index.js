const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = process.env.MONGO_URI;

const app = express();

const Answer = new Schema({
  q_1: {
    type: String,
    required: true,
  },
  q_2: {
    type: String,
    required: true,
  },
  q_3: {
    type: String,
    required: true,
  },
  q_4: {
    type: String,
    required: true,
  },
  q_5: {
    type: String,
    required: true,
  },
  q_6: {
    type: String,
    required: true,
  },
  q_7: {
    type: String,
    required: true,
  },
  q_8: {
    type: String,
    required: true,
  },
  q_9: {
    type: String,
    required: true,
  },
  q_10: {
    type: String,
    required: true,
  },
  optin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Mongo Datebase connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/questionnaire", async (req, res) => {
  console.log(req.body);
  const { q_1, q_2, q_3, q_4, q_5, q_6, q_7, q_8, q_9, q_10, optin, email } =
    req.body;
  try {
    let answer = new Answer({
      q_1: q_1.length === 1 ? q_1[0] : q_1.join(", "),
      q_2: q_2.length === 1 ? q_2[0] : q_2.join(", "),
      q_3: q_3.length === 1 ? q_3[0] : q_3.join(", "),
      q_4: q_4.length === 1 ? q_4[0] : q_4.join(", "),
      q_5: q_5.length === 1 ? q_5[0] : q_5.join(", "),
      q_6: q_6.length === 1 ? q_6[0] : q_6.join(", "),
      q_7: q_7.length === 1 ? q_7[0] : q_7.join(", "),
      q_8: q_8.length === 1 ? q_8[0] : q_8.join(", "),
      q_9: q_9.length === 1 ? q_9[0] : q_9.join(", "),
      q_10,
      optin: optin.length === 1 ? optin[0] : optin.join(", "),
      email,
    });
    await answer.save();
    res.send(answer._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`App is listenning on port ${PORT} ...`);
});