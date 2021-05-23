const User = require("../database/models/userModel");
const basicOperationResult = require("../helpers/basicOperationResult");
const encriptHelper = require("../helpers/encriptHelper");
var jwt = require("jsonwebtoken");

const authenticate = async ({ username, password }) => {
  const authErrorMessage = "Usuario o contraseña incorrecto";

  const user = await User.findOne({
    username,
  }).exec();

  if (user) {
    const isUserPassword = await encriptHelper.compareText(
      password,
      user.password
    );

    const token = isUserPassword && buildToken(user);

    return token
      ? basicOperationResult.ok(token)
      : basicOperationResult.fail(authErrorMessage);
  }

  return basicOperationResult.fail(authErrorMessage);
};

const buildToken = ({ _id, names, lastnames, username, email, rolId }) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { id: _id, names, lastnames, username, email, rolId },
    },
    process.env.JWT_SECRET
  );
};

module.exports = { authenticate };
