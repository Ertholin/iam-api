import { UserTokenTable } from "../../database/migrations/2023_08_23_00001_user_token_table.mjs"
import { UserTable } from "../../database/migrations/2023_08_23_00001_users_table.mjs"

export default class Migrate{

    constructor(){
        this.migrations = [
            UserTable,
            UserTokenTable
        ]
    }


    static getInstance(){
        return new this()
    }

    static get shared(){
        if(!this.singleton){
            this.singleton = this.getInstance()
        }
        return this.singleton
    }

    execute(){
        this.migrations.forEach(table => table())
    }
}