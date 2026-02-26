require("dotenv").config();

const path = require("path");

const dbFile = process.env.DB_FILE || "app.sqlite";
const dbPath = path.resolve(__dirname, "data", dbFile);

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "database", "seeds"),
    },
  },
};
