// responsibility to join every routes

const Router = require("express");

const usersRoutes = require("./users.routes"); // import
const notesRoutes = require("./notes.routes"); // import
const tagsRoutes = require("./tags.routes"); // import

const routes = Router();

routes.use("/users", usersRoutes); // use this resource and you be send to user.routes.js
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;