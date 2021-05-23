const httpStatusCodes = require("../enums/httpStatusCodes");
var jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {
  try {
    const unauthorizeMessage = "";

    if (request.headers?.authorization) {
      const tokenPosition = 1;
      const tokenSplit = request.headers.authorization.split(" ");
      const token = tokenSplit[tokenPosition];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      request.userId = decodedToken.data.id;

      return decodedToken
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

module.exports = authenticate;
