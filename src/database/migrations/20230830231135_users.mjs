
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.hasTable('users').then((exists) => {
        if (!exists) {
          return knex.schema.createTable('users', function (table) {
            table.increments();
            table.string('email', 128).unique().nullable();
            table.string('phone', 24).unique().nullable();
            table.string('password');
            table.timestamps();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    return knex.schema.dropTableIfExists("users")
};
