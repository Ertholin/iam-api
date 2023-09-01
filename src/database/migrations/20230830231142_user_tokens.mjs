
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    return knex.schema.hasTable('user_tokens').then((exists) => {
        if (!exists) {
          return Promise.all([
            knex.schema.createTable('user_tokens', (table) => {
              table.increments()
              table.string('uuid', 48).unique()
              table.string('type', 32)
              table.integer('user_id').unsigned()
              table.datetime('expires_at', { precision: 6 }).defaultTo(knex.fn.now(6))
              table.timestamps()
            }),
            knex.schema.table('user_tokens', function (table) {
              table.foreign('user_id').references('users.id')
            })
          ])
        }
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    return knex.schema.dropTableIfExists("user_tokens")
};
