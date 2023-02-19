const Router = require("express").Router;
const router = Router();

// viee delete and add notice

const {
  getNotice,
  addNotice,
  deleteNotice,
} = require("../controllers/notice.js");

// get all notice
router.get("/view-notice", getNotice);

// add notice
router.post("/add-notice", addNotice);

// delete notice
router.delete("/delete-notice/:id", deleteNotice);

module.exports = router;
