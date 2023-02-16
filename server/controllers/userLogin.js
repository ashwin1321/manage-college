const { connectDb, client } = require("../models/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

connectDb();

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const query = `select * from users where email = '${email}'`;

    const userLogin = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      if (result.rows.length === 0) {
        res.status(404).json({ noUser: "User not found" });
        return;
      }

      const user = result.rows[0];
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        res.status(401).json({ wrongPassword: "Incorrect password" });
        return;
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
