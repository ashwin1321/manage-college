const express = require("express");
const router = express.Router();
const { getNotes, addNotes, deleteNotes } = require("../controllers/notes.js");

//  get notes
router.get("/view-notes", getNotes);

//  add notes
router.post("/add-notes", addNotes);

//delete notes
router.delete("/delete-notes/:id", deleteNotes);

module.exports = router;
