const express = require("express");
const cors = require("cors");
const userLogin = require("./routes/userLogin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", userLogin);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
