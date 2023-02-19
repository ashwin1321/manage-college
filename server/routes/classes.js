//  view add and delete class

const express = require("express");
const router = express.Router();
const { getClass, addClass, deleteClass } = require("../controllers/classes");

// get all classes
router.get("/view-classes", getClass);

// add class
router.post("/add-class", addClass);

// delete class
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
