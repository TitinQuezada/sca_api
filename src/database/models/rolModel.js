const mongoose = require("../applicationDbContext");

const rolSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Rol = mongoose.model("roles", rolSchema);

module.exports = Rol;
