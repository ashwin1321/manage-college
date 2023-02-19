const { connectDb, client } = require("../models/config");

//  view notes
exports.getNotes = async (req, res) => {
  try {
    const { sid } = req.params;
    const query = `SELECT * FROM notes where sid = '${sid}'`;

    const viewNote = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result.rows);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//  add notes=
exports.addNotes = async (req, res) => {
  try {
    const { sid } = req.params;
    const { note } = req.body;

    const query = `INSERT INTO notes (sid, note) VALUES ('${sid}', '${note}')`;

    const addintodb = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Note added" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete notes
exports.deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM notes WHERE id = '${id}'`;

    const delnote = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: "Note deleted" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
