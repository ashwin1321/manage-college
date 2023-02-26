const { connectDb, client } = require("../models/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

connectDb();

exports.loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (role === "admin") {
            const query = `select * from users where email = $1`;
            const values = [email];

            const result = await client.query(query, values)

            if (result.rows.length === 0) {
                res.status(404).json({ noUser: "User not found" });
                return;
            }

            const user = result.rows[0];
            const isPasswordCorrect = password === user.password;

            if (!isPasswordCorrect) {
                res.status(404).json({ wrongPassword: "Incorrect password" });
                return;
            }

            const token = jwt.sign(
                { email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({ token: token, user: user });

        }

        if (role === "teacher") {
            const query = `select * from teachers where email = $1`;
            const values = [email];

            const result = await client.query(query, values)

            if (result.rows.length === 0) {
                res.status(404).json({ noUser: "User not found" });
                return;
            }

            const user = result.rows[0];
            const isPasswordCorrect = password === user.password;

            if (!isPasswordCorrect) {
                res.status(404).json({ wrongPassword: "Incorrect password" });
                return;
            }

            const token = jwt.sign(
                { email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({ token: token, user: user });
        }

        if (role === "student") {
            const query = `select * from students where email = $1`;
            const values = [email];

            const result = await client.query(query, values)

            if (result.rows.length === 0) {
                res.status(404).json({ noUser: "User not found" });
                return;
            }

            const user = result.rows[0];
            const isPasswordCorrect = password === user.password;

            if (!isPasswordCorrect) {
                res.status(404).json({ wrongPassword: "Incorrect password" });
                return;
            }

            const token = jwt.sign(
                { email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({ token: token, user: user });

        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { role } = req.body;

        if (role === "teacher") {
            const { tid, name, email, password } = req.body;
            let query = `insert into teachers(tid,  name, email, password, role) values($1, $2, $3, $4, $5)`;
            const values = [tid, name, email, password, role]

            const result = await client.query(query, values)
            res.status(201).json("teacher added successfully");

        }

        if (role === "student") {
            const { stuid, cid, name, email, password } = req.body;
            let query = `insert into students(stuid, cid, name, email, password, role) values($1, $2, $3, $4, $5, $6)`;
            const values = [stuid, cid, name, email, password, role]

            const result = await client.query(query, values)
            res.status(201).json("student added successfully");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getStudents = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const query = `select stuid,cid,name,email from students where cid = $1`;
        const values = [id];

        const result = await client.query(query, values)
        res.status(200).json(result.rows);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const query = `select tid,name,email from teachers`;

        const result = await client.query(query)
        res.status(200).json(result.rows);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
