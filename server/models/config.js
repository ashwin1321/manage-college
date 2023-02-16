const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  password: `${process.env.PGPASSWORD}`,
  port: process.env.PGPORT,
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log(`Connected to ${process.env.PGNAME} database`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb, client };
