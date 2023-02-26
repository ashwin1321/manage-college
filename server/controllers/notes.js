const { connectDb, client } = require("../models/config");

//  view notes
exports.getNotes = async (req, res) => {
    try {
        const { sid } = req.params;
        const query = `SELECT * FROM notes where sid = $1`;
        const values = [sid];

        const result = await client.query(query, values)

        res.status(200).json(result.rows);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  add notes=
exports.addNotes = async (req, res) => {
    try {
        const { sid } = req.params;
        const { note } = req.body;

        const query = `INSERT INTO notes (sid, note) VALUES ($1, $2)`;
        const values = [sid, note];

        const result = client.query(query, values)

        res.status(201).json({ message: "Note added" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete notes
exports.deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `DELETE FROM notes WHERE id = $1`;
        const values = [id];

        const result = await client.query(query, values)

        res.status(200).json({ message: "Note deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
