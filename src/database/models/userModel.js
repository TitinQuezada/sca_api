const mongoose = require("../applicationDbContext");

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    lastnames: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rolId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
