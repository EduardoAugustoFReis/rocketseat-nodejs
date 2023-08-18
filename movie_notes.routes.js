const Router = require("express");

const Movie_noteController = require("../controllers/movie_noteController"); // import class

const movie_noteController = new Movie_noteController(); // create instance

const movieNotesRoutes = Router();

movieNotesRoutes.post("/:user_id", movie_noteController.create);
movieNotesRoutes.get("/:id", movie_noteController.show);
movieNotesRoutes.delete("/:id", movie_noteController.delete);

module.exports = movieNotesRoutes;