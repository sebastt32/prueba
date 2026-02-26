/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function up(knex) {
  const exists = await knex.schema.hasTable("users");
  if (exists) {
    return;
  }

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("created_at").notNullable();
  });
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("users");
};
