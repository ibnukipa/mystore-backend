/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('merchants', table => {
    table.increments('id')
      .primary()
      .unique()

    table.uuid('hash')
      .unique()
      .notNullable()
      .defaultTo(knex.raw('gen_random_uuid()'))

    table.string('name')
      .notNullable()

    table.string('phone_number')
      .nullable()

    table.string('latitude')
      .nullable()

    table.string('longitude')
      .nullable()

    table.boolean('is_active')
      .notNullable()
      .defaultTo(false)

    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('merchants')
};
