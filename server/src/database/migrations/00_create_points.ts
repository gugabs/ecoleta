import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();

    table.string("name").notNullable();

    table.string("email").notNullable();

    table.string("whatsapp").notNullable();

    table.string("state").notNullable();

    table.string("city").notNullable();

    table.decimal("latitude").notNullable();

    table.decimal("longitude").notNullable();

    table.string("image").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("points");
}
