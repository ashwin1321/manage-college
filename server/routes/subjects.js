// view and add subjects
const Router = require("express").Router;
const router = Router();

const {
  getSubject,
  addSubject,
  getSubjectByClass,
} = require("../controllers/subjects");

// get all subjects
router.get("/view-subjects", getSubject);

//  get subject by class
router.get("/view-subjects/:class", getSubjectByClass);

// add subject
router.post("/add-subject", addSubject);

module.exports = router;
