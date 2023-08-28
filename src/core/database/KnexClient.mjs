import Knex from "knex";
import ConfigurationService from "../../services/ConfigurationService.mjs";

export const KnexClient = Knex({
    client: ConfigurationService.shared.get('databaseConnection'),
    connection: {
      host : ConfigurationService.shared.get('databaseHost'),
      port : ConfigurationService.shared.get('databasePort'),
      user : ConfigurationService.shared.get('databaseUsername'),
      password : ConfigurationService.shared.get('databasePassword'),
      database : ConfigurationService.shared.get('databaseName')
    }
  })