// view and add subjects
const Router = require("express").Router;
const router = Router();

const { getSubject, addSubject } = require("../controllers/subjects");

// get all subjects
router.get("/view-subjects", getSubject);

// add subject
router.post("/add-subject", addSubject);

module.exports = router;
