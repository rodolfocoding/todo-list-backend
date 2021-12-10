const express = require("express");

const UserController = require("./app/controller/UserController");

const routes = express.Router();

routes.get("/users", UserController.index);

routes.post("/users", UserController.create);

module.exports = routes;
