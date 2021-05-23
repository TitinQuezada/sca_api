const mongoose = require("../applicationDbContext");

const studyCenterSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const StudyCenter = mongoose.model("studyCenters", studyCenterSchema);

module.exports = StudyCenter;
