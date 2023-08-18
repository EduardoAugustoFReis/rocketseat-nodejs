const Router = require("express");

const Movie_tagController = require("../controllers/movie_tagController"); // import class

const movie_tagController = new Movie_tagController(); // instance of class "Movie_tagController"

const movieTagRoutes = Router(); // initialize express

movieTagRoutes.get("/:user_id", movie_tagController.index);
movieTagRoutes.delete("/:user_id", movie_tagController.delete);

module.exports = movieTagRoutes;