const Router = require("express").Router;
const { loginUser } = require("../controllers/userLogin");

const router = Router();

router.get("/login", loginUser);

module.exports = router;
