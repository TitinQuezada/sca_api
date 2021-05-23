const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

const authenticate = require("./middlewares/authenticate");
const administrator = require("./middlewares/administrator");

const studyCentersController = require("./controllers/studyCentersController");
const usersController = require("./controllers/usersController");
const authController = require("./controllers/authController");
const rolesController = require("./controllers/rolesController");

app.use(express.json());

app.use("/auth", authController);

app.use("/users", usersController);

app.use("/studyCenters", authenticate, studyCentersController);

app.use("/roles", administrator, rolesController);

app.listen(port, () => {
  console.log("Ejecutando en el puerto", port);
});
