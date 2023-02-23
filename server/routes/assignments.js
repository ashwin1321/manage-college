// teacher post and delete assignments
// students view assignments

const Router = require("express").Router;
const router = Router();

const {
  getAssignment,
  addAssignment,
  deleteAssignment,
} = require("../controllers/assignments.js");
const validToken = require("../middlewares/validateUser");

// get all assignments
router.get("/view-assignments/:sid", validToken, getAssignment);

// add assignment
router.post("/add-assignment/:sid", validToken, addAssignment);

// delete assignment
router.delete("/delete-assignment/:id", validToken, deleteAssignment);

module.exports = router;
