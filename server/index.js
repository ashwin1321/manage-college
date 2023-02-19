const express = require("express");
const cors = require("cors");
const userLogin = require("./routes/userLogin");
const classes = require("./routes/classes");
const assignments = require("./routes/assignments");
const notes = require("./routes/notes");
const notice = require("./routes/notice");
const subject = require("./routes/subjects");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userLogin);
app.use("/class", classes);
app.use("/assignments", assignments);
app.use("/notes", notes);
app.use("/notice", notice);
app.use("/subject", subject);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
