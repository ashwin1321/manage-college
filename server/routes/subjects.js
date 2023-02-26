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
const validToken = require("../middlewares/validateUser");

router.get("/view-subjects/:class", validToken, getSubjectByClass);

router.get("/get-subjects/:id", validToken, teacherSubjects);

// add subject
router.post("/add-subject", validToken, addSubject);

router.post("/assign-teacher", validToken, assignTeacher);

module.exports = router;
