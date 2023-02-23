//  view add and delete class
const Router = require("express").Router;
const router = Router();
const validToken = require("../middlewares/validateUser");

const { getClass, addClass, deleteClass } = require("../controllers/classes");

// get all classes
router.get("/view-classes", validToken, getClass);

// add class
router.post("/add-class", validToken, addClass);

// delete class
router.delete("/delete-class/:id", validToken, deleteClass);

module.exports = router;
