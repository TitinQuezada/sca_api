const User = require("../database/models/userModel");
const basicOperationResult = require("../helpers/basicOperationResult");

const createUser = async (user) => {
  try {
    const errorMessage = validateUserToCreate(user);

    if (errorMessage) {
      return basicOperationResult.fail(errorMessage);
    }

    await new User(user).save();

    return basicOperationResult.ok();
  } catch (ex) {
    return basicOperationResult.fail(ex);
  }
};

const validateUserToCreate = ({
  names,
  lastnames,
  username,
  email,
  password,
  rolId,
}) => {
  if (!names) {
    return "Los nombres del usuario es requerido";
  }

  if (!lastnames) {
    return "Los apellidos del usuario es requerido";
  }

  if (!username) {
    return "El nombre de usuario es requerido";
  }

  if (!email) {
    return "El correo electrónico del usuario es requerido";
  }

  if (!password) {
    return "La contraseña del usuario es requerida";
  }

  if (!rolId) {
    return "El rol del usuario es requerido";
  }
};

module.exports = { createUser };
