const bcrypt = require("bcrypt");

const encriptText = async (text) => {
  return await bcrypt.hash(text, process.env.SALTROUNDS);
};

const compareText = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};

module.exports = { encriptText, compareText };
