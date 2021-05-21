const express = require("express");
const router = express.Router();

const { createUser } = require("../managers/userManager");
const httpStatusCodes = require("../enums/httpStatusCodes");

router.post("/", async ({ body }, response) => {
  const operationResult = await createUser(body);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.created).end();
});

module.exports = router;
