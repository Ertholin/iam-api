import Migrate from "../database/Migrate.mjs"

export default class DatabaseCommand {

    static getInstance(){
        return new this()
    }

    static get shared(){
        if(!this.singleton){
            this.singleton = this.getInstance()
        }
        return this.singleton
    }

    makeMigration(){
        Migrate.shared.execute()
    }
}