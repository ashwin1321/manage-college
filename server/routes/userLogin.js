const Router = require("express").Router;
const { loginUser } = require("../controllers/userLogin");

const router = Router();

router.post("/login", loginUser);

module.exports = router;
