const { connectDb, client } = require("../models/config");

// getClass
exports.getClass = async (req, res) => {
    try {
        const query = `select * from classes`;

        const result = await client.query(query);

        if (result.rows.length === 0) {
            res.json({ noClass: "No class found" });
            return;
        }
        res.status(200).json({ classes: result.rows });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addClass = async (req, res) => {
    try {
        const { cid, classs } = req.body;
        const query = `insert into classes (cid, class) values ($1, $2)`;
        const values = [cid, classs];

        const result = await client.query(query, values);
        res.status(201).json({ message: "Class added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// as other table may be dependent on this table so we can't delete it directly from the database so we have to delete it from the other table first and then delete it from this table

exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `delete from classes where cid = $1`;
        const values = [id];

        const result = await client.query(query, values)

        res.status(200).json({ message: "Class deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
