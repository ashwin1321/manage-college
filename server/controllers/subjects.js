const { parse } = require("pg-protocol");
const { connectDb, client } = require("../models/config");

//  view subjects
exports.getSubject = async (req, res) => {
    try {
        const query = `SELECT * FROM subjects`;

        const result = await client.query(query)

        res.status(200).json({ subjects: result.rows });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get subject by class
exports.getSubjectByClass = async (req, res) => {
    const classs = req.params.class;
    try {
        const query = `SELECT * FROM subjects where cid= $1`;
        const values = [classs];

        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ noSubject: "No subject found" });
            return;
        }
        res.status(200).json({ subjects: result.rows });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//  add subject
exports.addSubject = async (req, res) => {
    const { sid, subject, cid } = req.body;
    try {
        const query = `insert into subjects (sid, subject, cid) values ($1, $2, $3)`;
        const values = [sid, subject, cid];

        const result = client.query(query, values)

        res.status(201).json({ message: "Subject added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignTeacher = async (req, res) => {
    const { tid, sid } = req.body;
    try {
        const query = `insert into teachSubjects (tid, sid) values ($1, $2)`;
        const values = [tid, sid];

        const result = await client.query(query, values)

        res.status(201).json({ message: "Teacher assigned successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.teacherSubjects = async (req, res) => {
    const tid = req.params;

    try {
        const query = `select teacher.name, teachsubject.sid, subject.subject, subject.cid
    from teachers teacher
    inner join teachsubjects teachsubject on teacher.tid = teachsubject.tid
    inner join subjects subject on teachsubject.sid = subject.sid
    where teacher.tid =$1`;
        const values = [tid.id];

        const result = await client.query(query, values)

        if (result.rows.length === 0) {
            res.status(404).json({ noSubject: "No subject found" });
            return;
        }

        res.status(200).json({ subjects: result.rows });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
