// view and add subjects
const Router = require("express").Router;
const router = Router();

const {
  getSubject,
  addSubject,
  getSubjectByClass,
  assignTeacher,
  teacherSubjects,
} = require("../controllers/subjects");

// get all subjects
// router.get("/view-subjects", getSubject);

//  get subject by class
router.get("/view-subjects/:class", getSubjectByClass);

router.get("/get-subjects/:id", teacherSubjects);

// add subject
router.post("/add-subject", addSubject);

router.post("/assign-teacher", assignTeacher);

module.exports = router;
