// responsibility to know users routes
const {Router} = require("express"); // import express functions

const usersRoutes = Router(); // initialize o express

const UsersController = require("../controllers/UsersController"); // import class

const usersController = new UsersController(); // create new instance

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;