const Rol = require("../database/models/rolModel");
const operationResult = require("../helpers/basicOperationResult");

const getAll = async () => {
  try {
    const roles = await Rol.find().exec();
    return operationResult.ok(roles);
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const getById = async (id) => {
  try {
    const rol = await Rol.find({ _id: id }).exec();
    return operationResult.ok(rol);
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const getByCode = async (code) => {
  try {
    const rol = await Rol.find({ code }).exec();
    return operationResult.ok(rol);
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const create = async (rol) => {
  try {
    const errorMessage = validateRol(rol);

    if (errorMessage) {
      return operationResult.fail(errorMessage);
    }

    await new Rol(rol).save();

    return operationResult.ok();
  } catch (exception) {
    return operationResult.fail(exception);
  }
};

const validateRol = ({ code, name }) => {
  if (!code) {
    return "El código es requerido";
  }

  if (!name) {
    return "El nombre es requerido";
  }
};

module.exports = { create, getByCode, getById, getAll };
