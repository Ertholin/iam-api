export const UserTokenTypeEnum = {
    EMAIL: 1,
    PASSWORD: 2,
    ACCOUNT_CONFIRMATION: 3
}

export default class UserToken{
    constructor({ id, uuid, type, userId, expiresAt }){
        this.id = id
        this.uuid = uuid
        this.type = type 
        this.userId = userId
        this.expiresAt = expiresAt
    }
}