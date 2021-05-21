const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();

const studyCentersController = require("./controllers/studyCentersController");
const usersController = require("./controllers/usersController");

app.use(express.json());

app.use("/users", usersController);

app.use("/studyCenters", studyCentersController);

app.listen(port, () => {
  console.log("Ejecutando en el puerto", port);
});
