const express = require("express");
const router = express.Router();
const httpStatusCodes = require("../enums/httpStatusCodes");
const rolManager = require("../managers/rolManager");

router.get("/", async ({}, response) => {
  const operationResult = await rolManager.getAll();

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.get("/:id", async ({ params }, response) => {
  const operationResult = await rolManager.getById(params.id);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.get("/code/:code", async ({ params }, response) => {
  const operationResult = await rolManager.getByCode(params.code);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.post("/", async ({ body }, response) => {
  const operationResult = await rolManager.create(body);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.created).end();
});

module.exports = router;
