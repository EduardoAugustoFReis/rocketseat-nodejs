
const {Router} = require("express"); // import express

const NotesControllers = require("../controllers/NotesController") // import class "NoteControllers"

const noteRoutes = Router(); // initialize express

const notesControllers = new NotesControllers(); // use "NotesControllers" methods 

noteRoutes.get("/", notesControllers.index);
noteRoutes.post("/:user_id", notesControllers.create);
noteRoutes.get("/:id", notesControllers.show);
noteRoutes.delete("/:id", notesControllers.delete);

module.exports = noteRoutes;