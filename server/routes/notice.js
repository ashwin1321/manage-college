const Router = require("express").Router;
const router = Router();

// viee delete and add notice

const {
    getNotice,
    addNotice,
    deleteNotice,
} = require("../controllers/notice.js");
const validToken = require("../middlewares/validateUser");

// get all notice
router.get("/view-notice", validToken, getNotice);

// add notice
router.post("/add-notice", validToken, addNotice);

// delete notice
router.delete("/delete-notice/:id", validToken, deleteNotice);

module.exports = router;
