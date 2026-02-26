require("dotenv").config();

const fs = require("fs");
const path = require("path");

const dbFile = process.env.DB_FILE || "app.sqlite";
const dbPath = path.resolve(__dirname, "..", "data", dbFile);

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
console.log(`[DB] Directory ready: ${path.dirname(dbPath)}`);
