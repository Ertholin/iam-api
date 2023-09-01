import 'dotenv/config'
import Knex from "knex";
import ConfigurationService from "../../services/ConfigurationService.mjs";
import { $configurationService } from "../../services/ConfigurationService.mjs";

export const KnexClient = Knex({
  debug: false,
    client: ConfigurationService.shared.get('databaseConnection'),
    connection: {
      host : ConfigurationService.shared.get('databaseHost'),
      port : ConfigurationService.shared.get('databasePort'),
      user : ConfigurationService.shared.get('databaseUsername'),
      password : ConfigurationService.shared.get('databasePassword'),
      database : ConfigurationService.shared.get('databaseName')
    }
  })