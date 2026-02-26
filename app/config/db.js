const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let dbInstance = null;

function getDbPath() {
  const fileName = process.env.DB_FILE || "app.sqlite";
  return path.resolve(process.cwd(), "data", fileName);
}

async function runMigrations(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL
    );
  `);
}

async function seedUsers(db) {
  const row = await db.get("SELECT COUNT(*) AS total FROM users;");
  if (row.total > 0) {
    return;
  }

  const now = new Date().toISOString();
  await db.run("INSERT INTO users (name, email, created_at) VALUES (?, ?, ?);", [
    "Ada Lovelace",
    "ada@example.com",
    now,
  ]);
  await db.run("INSERT INTO users (name, email, created_at) VALUES (?, ?, ?);", [
    "Alan Turing",
    "alan@example.com",
    now,
  ]);
}

async function connectDB() {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = getDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await runMigrations(dbInstance);
  await seedUsers(dbInstance);

  console.log(`[DB] SQLite ready at ${dbPath}`);
  return dbInstance;
}

async function getDB() {
  if (!dbInstance) {
    await connectDB();
  }
  return dbInstance;
}

module.exports = connectDB;
module.exports.getDB = getDB;
