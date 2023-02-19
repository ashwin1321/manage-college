const Router = require("express").Router;
const {
  loginUser,
  registerUser,
  changePassword,
} = require("../controllers/userLogin");

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser); // only admin can add or delete     // register to respective table
router.patch("/change-password", changePassword);

module.exports = router;
