const Router = require("express").Router;
const router = Router();

const { getNotes, addNotes, deleteNotes } = require("../controllers/notes.js");
const validToken = require("../middlewares/validateUser");

//  get notes
router.get("/view-notes/:sid", validToken, getNotes);

//  add notes
router.post("/add-notes/:sid", validToken, addNotes);

//delete notes
router.delete("/delete-notes/:id", validToken, deleteNotes);

module.exports = router;
