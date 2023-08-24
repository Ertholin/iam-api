import { v4 as uuidv4 } from 'uuid';
import UserToken, { UserTokenTypeEnum } from "../models/UserToken.mjs"
import EntityManager from "./EntityManager.mjs"

export default class UserTokenService{
    constructor(){
        this.entityManager = EntityManager.shared
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

    generateToken(user, tokenType, expireHours){
       if(Object.keys(UserTokenTypeEnum).includes[tokenType]){
        throw new Error(`TokenTypeEnum not exists (${tokenType})`)
       } 
       const entity = new UserToken( {id: 0, uuid: String(uuidv4()), type: tokenType, userId: user.id, expiresAt: this.futureDate(expireHours)})
       this.entityManager.create(entity)
       return entity
    }

    futureDate(hours){
        const now = new Date()
        now.setHours(now.getHours() + hours)
        return now
    }
}