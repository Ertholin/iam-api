import { KnexClient } from "../../core/database/KnexClient.mjs";

export const UserTokenTable = ()  => {
    KnexClient.schema.createTable('user_tokens', (table) => {
        table.increments()
        table.string('uuid', 48).unique()
        table.string('type', 32)
        table.integer('user_id').unsigned()
        table.datetime('expires_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.timestamps()
    })
};

