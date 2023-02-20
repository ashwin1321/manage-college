const { connectDb, client } = require("../models/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

connectDb();

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === "admin") {
      const query = `select * from users where email = '${email}'`;

      const userLogin = client.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        if (result.rows.length === 0) {
          res.json({ noUser: "User not found" });
          return;
        }

        const user = result.rows[0];
        // const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        const isPasswordCorrect = password === user.password;

        if (!isPasswordCorrect) {
          res.json({ wrongPassword: "Incorrect password" });
          return;
        }

        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, user: user });
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (role === "teacher") {
      const { tid, sid, name, email, password } = req.body;
      let query = `insert into teachers(tid, sid, name, email, password) values('${tid}', '${sid}', '${name}', '${email}', '${password}')`;

      const addTeacher = client.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json("teacher added successfully");
      });
    }
    if (role === "student") {
      const { stuid, cid, name, email, password } = req.body;
      let query = `insert into students(stuid, cid, name, email, password) values('${stuid}', '${cid}', '${name}', '${email}', '${password}')`;

      const addTeacher = client.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json("student added successfully");
      });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  // change pasword hash and store
  // =============== REMAINING ===============
  // try {
  //   const { email, password } = req.body;
  //   const query = `select * from users where email = '${email}'`;
  //   const userExists = client.query(query, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     if (result.rows.length === 0) {
  //       res.status(200).json({ noUser: "User not found" });
  //     }
  //     const user = result.rows[0];
  //     const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  //     if (!isPasswordCorrect) {
  //       res.status(200).json({ wrongPassword: "Incorrect password" });
  //     }
  //   });
  // } catch (err) {
  //   res.status(404).json({ error: err.message });
  // }
  res.send("change password");
};

exports.getStudents = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const query = `select stuid,cid,name,email from students where cid = '${id}'`;

    const viewStudent = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      res.json(result.rows);
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
