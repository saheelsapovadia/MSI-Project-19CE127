const { Pool, Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "motorola",
  password: "root",
  port: 5432,
});
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "motorola",
  password: "root",
  port: 5432,
});

client.connect().then(() => {
  console.log("Database connected on PORT 5432");
});

module.exports = { client, pool };
