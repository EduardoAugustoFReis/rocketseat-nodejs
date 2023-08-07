const {Router} = require("express"); // import express

const TagsControllers = require("../controllers/TagsController") // import class "TagsControllers"

const tagsRoutes = Router(); // initialize express

const tagsControllers = new TagsControllers  // use "NotesControllers" methods 

tagsRoutes.get("/:user_id", tagsControllers.index);

module.exports = tagsRoutes;