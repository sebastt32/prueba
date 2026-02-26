const { getDB } = require("../config/db");

class UserModel {
  // Eloquent-style API for service layer consumption.
  static async all() {
    const db = await getDB();
    const rows = await db.all(
      "SELECT id, name, email, created_at AS createdAt FROM users ORDER BY id ASC;"
    );
    return rows.map((row) => ({ ...row, id: String(row.id) }));
  }

  static async find(id) {
    const db = await getDB();
    const row = await db.get(
      "SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ?;",
      [id]
    );

    if (!row) {
      return null;
    }

    return { ...row, id: String(row.id) };
  }

  static async delete(id) {
    const db = await getDB();
    await db.run("DELETE FROM users WHERE id = ?;", [id]);
  }

  static async create(payload) {
    const db = await getDB();
    const createdAt = new Date().toISOString();

    const result = await db.run("INSERT INTO users (name, email, created_at) VALUES (?, ?, ?);", [
      payload.name,
      payload.email,
      createdAt,
    ]);

    return {
      id: String(result.lastID),
      name: payload.name,
      email: payload.email,
      createdAt,
    };
  }
}

module.exports = UserModel;
