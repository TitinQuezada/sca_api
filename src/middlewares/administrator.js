const httpStatusCodes = require("../enums/httpStatusCodes");
const jwt = require("jsonwebtoken");
const Rol = require("../database/models/rolModel");

const administrator = async (request, response, next) => {
  try {
    const unauthorizeMessage = "Unauthorize";

    if (request.headers?.authorization) {
      const tokenPosition = 1;
      const tokenSplit = request.headers.authorization.split(" ");
      const token = tokenSplit[tokenPosition];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      request.userId = decodedToken.data.id;
      const administratorRolId = await getAdministratorRoleId();

      return decodedToken?.data.rolId == administratorRolId
        ? next()
        : response.status(httpStatusCodes.unauthorize).send(unauthorizeMessage);
    }

    return response
      .status(httpStatusCodes.unauthorize)
      .send(unauthorizeMessage);
  } catch (exception) {
    return response.status(httpStatusCodes.unauthorize).send(exception);
  }
};

const getAdministratorRoleId = async () => {
  const rol = await Rol.findOne({ code: "Admin" }).exec();

  return rol._id;
};

module.exports = administrator;
