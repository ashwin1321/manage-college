const Router = require("express").Router;
const {
    loginUser,
    registerUser,
    changePassword,
    getStudents,
    getTeachers,
} = require("../controllers/userLogin");

const router = Router();

router.get("/view-students/:id", getStudents); // get user details
router.get("/view-teachers", getTeachers); // get user details
router.post("/login", loginUser);
router.post("/register", registerUser);
module.exports = router;
