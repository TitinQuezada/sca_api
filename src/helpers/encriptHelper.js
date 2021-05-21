const bcrypt = require("bcrypt");
const saltRounds = 10;

const encriptText = async (text) => {
  return await bcrypt.hash(text, saltRounds);
};

const compareText = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};

module.exports = { encriptText, compareText };
