const db = require("../models/config");

exports.loginUser = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // console.log(email, password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
