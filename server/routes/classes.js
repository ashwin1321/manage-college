//  view add and delete class
const Router = require("express").Router;
const router = Router();

const { getClass, addClass, deleteClass } = require("../controllers/classes");

// get all classes
router.get("/view-classes", getClass);

// add class
router.post("/add-class", addClass);

// delete class
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
