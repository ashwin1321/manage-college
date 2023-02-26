const { connectDb, client } = require("../models/config");

exports.getNotice = async (req, res) => {
    try {
        const query = `select * from notice`;

        const result = await client.query(query)

        res.status(200).json(result.rows);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addNotice = async (req, res) => {
    const { notice, date } = req.body;

    try {
        const query = `insert into notice (notice, data) values ($1, $2)`;
        const values = [notice, date]

        const result = await client.query(query, values)
        res.status(201).json({ message: "Notice added successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteNotice = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `delete from notice where id = $1`;
        const values = [id];

        const result = await client.query(query, values)
        res.status(200).json({ message: "Notice deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
