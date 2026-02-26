const fs = require("fs");
const path = require("path");
const knexFactory = require("knex");
const request = require("supertest");
const app = require("../app");
const { closeDB } = require("../app/config/db");
const knexConfig = require("../knexfile").development;

const dbFile = path.resolve(process.cwd(), "data", process.env.DB_FILE || "test.sqlite");
let knex;

beforeAll(async () => {
  if (fs.existsSync(dbFile)) {
    fs.rmSync(dbFile, { force: true });
  }

  knex = knexFactory(knexConfig);
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  if (knex) {
    await knex.destroy();
  }
  await closeDB();
  if (fs.existsSync(dbFile)) {
    fs.rmSync(dbFile, { force: true });
  }
});

describe("Users API", () => {
  test("GET /api/v1/users returns jsonapi collection", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("jsonapi.version", "1.0");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("POST /api/v1/users creates a new user", async () => {
    const res = await request(app).post("/api/v1/users").send({
      name: "Test User",
      email: "test.user@example.com",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data.type", "users");
    expect(res.body.data.attributes.email).toBe("test.user@example.com");
  });

  test("DELETE /api/v1/users/:id deletes existing user", async () => {
    const created = await request(app).post("/api/v1/users").send({
      name: "Delete Me",
      email: "delete.me@example.com",
    });

    const userId = created.body.data.id;
    const deleted = await request(app).delete(`/api/v1/users/${userId}`);

    expect(deleted.status).toBe(204);
  });
});
