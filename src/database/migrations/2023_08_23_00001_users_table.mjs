import { KnexClient } from "../../core/database/KnexClient.mjs";

export const UserTable = ()  => {
    KnexClient.schema.createTable('users', function(table) {
        table.increments()
        table.string('email', 128).unique().nullable();
        table.string('phone', 24).unique().nullable();
        table.string('password');
        table.timestamps();
    })
  };