const { connectDb, client } = require("../models/config");

exports.getNotice = async (req, res) => {
  try {
    const query = `select * from notice`;

    const getnotice = client.query(query, (err, result) => {
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

exports.addNotice = async (req, res) => {
  const { notice, date } = req.body;

  try {
    const query = `insert into notice (notice, data) values ('${notice}','${date}')`;

    const addnotice = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ message: "Notice added successfully" });
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const query = `delete from notice where id = ${id}`;

    const deletenotice = client.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ message: "Notice deleted successfully" });
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
