const Router = require("express").Router;
const router = Router();

const { getNotes, addNotes, deleteNotes } = require("../controllers/notes.js");

//  get notes
router.get("/view-notes/:sid", getNotes);

//  add notes
router.post("/add-notes/:sid", addNotes);

//delete notes
router.delete("/delete-notes/:id", deleteNotes);

module.exports = router;
