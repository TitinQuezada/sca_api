const express = require("express");
const router = express.Router();
const studyCenterManager = require("../managers/studyCentersManager");
const httpStatusCodes = require("../enums/httpStatusCodes");
const administrator = require("../middlewares/administrator");

router.get("/all", administrator, async ({}, response) => {
  const operationResult = await studyCenterManager.getAll();

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.get("/", async ({ userId }, response) => {
  const operationResult = await studyCenterManager.getByUserId(userId);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.post("/", async ({ body, userId }, response) => {
  const operationResult = await studyCenterManager.create(body, userId);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.created).end();
});

module.exports = router;
