const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
  try {
    console.log(process.env.PGUSER);
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGNAME,
      password: `${process.env.PGPASSWORD}`,
      port: process.env.PGPORT,
    });
    await client.connect();
    console.log(`Connected to ${process.env.PGNAME} database`);
  } catch (error) {
    console.log(error);
  }
};

connectDb();
