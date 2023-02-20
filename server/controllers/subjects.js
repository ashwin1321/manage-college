const { connectDb, client } = require("../models/config");

//  view subjects
exports.getSubject = async (req, res) => {
  try {
    const query = `SELECT * FROM subjects`;

    const getSubjects = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      if (result.rows.length === 0) {
        res.json({ noSubject: "No subject found" });
        return;
      }

      res.status(200).json({ subjects: result.rows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get subject by class
exports.getSubjectByClass = async (req, res) => {
  const classs = req.params.class;
  console.log(classs);
  try {
    const query = `SELECT * FROM subjects where cid= '${classs}'`;

    const getSubjects = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      if (result.rows.length === 0) {
        res.json({ noSubject: "No subject found" });
        return;
      }

      res.status(200).json({ subjects: result.rows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  add subject
exports.addSubject = async (req, res) => {
  const { sid, subject, cid } = req.body;
  console.log(sid, subject, cid);
  try {
    const query = `insert into subjects (sid, subject, cid) values ('${sid}', '${subject}', '${cid}')`;

    const getSubjects = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      res.status(200).json({ message: "Subject added successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
