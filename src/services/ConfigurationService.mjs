export default class ConfigurationService{
    constructor() {
        this.configurations = {
            baseUrl: process.env.BASE_URL,
            accountCreationConfirmationUrl: process.env.ACCOUNT_CREATION_CONFIRMATION_URL,
            accountCreationConfirmationExpirationHours: process.env.ACCOUNT_CREATION_CONFIRMATION_EXPIRATION_HOURS
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