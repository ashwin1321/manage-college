const { connectDb, client } = require("../models/config");

//  view assignments
exports.getAssignment = async (req, res) => {
  try {
    const { sid } = req.params;
    const query = `select * from assignments where sid = '${sid}'`;

    const viewAssignments = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json(result.rows);
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//  add assignments
exports.addAssignment = async (req, res) => {
  try {
    const { assignment, note, sid } = req.body;

    const query = `insert into assignments (sid, assignment, note) values ('${sid}', '${assignment}', '${note}')`;

    const addintodb = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ message: "Assignment added" });
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// delete subject
exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `delete from assignments where id = '${id}'`;

    const delassignment = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ message: "Assignment deleted" });
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
