const express = require("express");
const router = express.Router();
const { authenticate } = require("../managers/authManager");
const httpStatusCodes = require("../enums/httpStatusCodes");

router.post("/", async ({ body }, response) => {
  const operationResult = await authenticate(body);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

module.exports = router;
