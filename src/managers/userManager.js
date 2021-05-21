const User = require("../database/models/userModel");
const basicOperationResult = require("../helpers/basicOperationResult");
const encriptHelper = require("../helpers/encriptHelper");

const createUser = async (user) => {
  try {
    const errorMessage = await validateUserToCreate(user);

    if (errorMessage) {
      return basicOperationResult.fail(errorMessage);
    }

    const userToCreate = await buildUser(user);

    await new User(userToCreate).save();

    return basicOperationResult.ok();
  } catch (exception) {
    return basicOperationResult.fail(exception);
  }
};

const buildUser = async (user) => {
  user.password = await encriptHelper.encriptText(user.password);

  return user;
};

const validateUserToCreate = async (user) => {
  const userRequiredPropertiesMessage = validateUserRequiredProperties(user);

  if (userRequiredPropertiesMessage) {
    return userRequiredPropertiesMessage;
  }

  const userUniquePropertiesMessage = await validateUserUniqueProperties(user);

  if (userUniquePropertiesMessage) {
    return userUniquePropertiesMessage;
  }
};

const validateUserUniqueProperties = async (user) => {
  const users = await User.find({
    $or: [{ username: user.username }, { email: user.email }],
  }).exec();

  const usersWithSameUsername = users.find(
    (userResult) => userResult.username == user.username
  );

  if (usersWithSameUsername) {
    return `El nombre de usuario ${user.username} ya existe`;
  }

  const usersWithSameEmail = users.find(
    (userResult) => userResult.email == user.email
  );

  if (usersWithSameEmail) {
    return `El correo eléctronico ${user.email} ya existe`;
  }
};

const validateUserRequiredProperties = ({
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
