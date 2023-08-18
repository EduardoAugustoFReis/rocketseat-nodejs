const {Router} = require("express"); // import express

const UsersController = require("../controllers/usersController"); // import controller

const usersController = new UsersController() // create instance

const usersRoutes = Router(); // initialize express

usersRoutes.post("/", usersController.create); // create user
usersRoutes.put("/:id", usersController.update); // update user

module.exports = usersRoutes;