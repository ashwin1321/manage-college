const { connectDb, client } = require("../models/config");

//  view assignments
exports.getAssignment = async (req, res) => {
    try {
        const { sid } = req.params;
        const query = `select * from assignments where sid = $1`;
        const values = [sid];

        const result = await client.query(query, values);
        res.status(200).json(result.rows);

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

//  add assignments
exports.addAssignment = async (req, res) => {
    try {
        const { assignment, note, sid } = req.body;

        const query = `insert into assignments (sid, assignment, note) values ($1, $2, $3)`;
        const values = [sid, assignment, note];

        const result = await client.query(query, values);
        res.status(201).json({ message: "Assignment added" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// delete subject
exports.deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `delete from assignments where id = $1`;
        const values = [id];

        const result = await client.query(query, values);
        res.status(200).json({ message: "Assignment deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
