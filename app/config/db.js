require("dotenv").config();

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let dbInstance = null;

function getDbPath() {
  const fileName = process.env.DB_FILE || "app.sqlite";
  return path.resolve(process.cwd(), "data", fileName);
}

async function ensureSchemaReady(db) {
  const row = await db.get(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'users';"
  );

  if (!row) {
    const error = new Error(
      "Missing table 'users'. Run 'npm run migrate' and then 'npm run seed'."
    );
    error.statusCode = 500;
    throw error;
  }
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

  await ensureSchemaReady(dbInstance);
  console.log(`[DB] SQLite ready at ${dbPath}`);
  return dbInstance;
}

async function getDB() {
  if (!dbInstance) {
    await connectDB();
  }
  return dbInstance;
}

async function closeDB() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}

module.exports = connectDB;
module.exports.getDB = getDB;
module.exports.closeDB = closeDB;
