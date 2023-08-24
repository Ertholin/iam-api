import ServiceContainer from "./ServiceContainer.mjs"

export default class ConfigurationService{
    constructor() {
        this.configurations = {
            baseUrl: process.env.BASE_URL,
            serverPort: process.env.SERVER_PORT,
            serverHost: process.env.SERVER_HOST,
            serverProtocol: process.env.SERVER_PROTOCOL,
            i18nFallbackLocale: process.env.I18N_FALLBACK_LOCALE,
            accountCreationConfirmationUrl: process.env.ACCOUNT_CREATION_CONFIRMATION_URL,
            accountCreationConfirmationExpirationHours: process.env.ACCOUNT_CREATION_CONFIRMATION_EXPIRATION_HOURS,
            // Database config
            databaseHost: process.env.DB_HOST,
            databasePort: process.env.DB_PORT,
            databaseName: process.env.DB_DATABASE,
            databaseUsername: process.env.DB_USERNAME,
            databasePassword: process.env.DB_PASSWORD,
            databaseConnection: process.env.DB_CONNECTION,
        }
    }

    static getInstance(){
        return new this()
    }

    static get shared (){
        if(!this.singleton) {
            this.singleton = this.getInstance()
        }
        return this.singleton
    }

    get(keyword){
        return this.configurations[keyword]
    }
    
}

export const $configurationService = ServiceContainer.shared.get(ConfigurationService)