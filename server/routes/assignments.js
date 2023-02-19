// teacher post and delete assignments
// students view assignments

const Router = require("express").Router;
const router = Router();

const {
  getAssignment,
  addAssignment,
  deleteAssignment,
} = require("../controllers/assignments.js");

// get all assignments
router.get("/view-assignments", getAssignment);

// add assignment
router.post("/add-assignment", addAssignment);

// delete assignment
router.delete("/delete-assignment/:id", deleteAssignment);

module.exports = router;
