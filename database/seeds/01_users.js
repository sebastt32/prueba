/**
 * @param {import("knex").Knex} knex
 */
exports.seed = async function seed(knex) {
  const alreadySeeded = await knex("users").count({ total: "*" }).first();
  if (Number(alreadySeeded.total) > 0) {
    return;
  }

  const now = new Date().toISOString();
  await knex("users").insert([
    {
      name: "Ada Lovelace",
      email: "ada@example.com",
      created_at: now,
    },
    {
      name: "Alan Turing",
      email: "alan@example.com",
      created_at: now,
    },
  ]);
};
