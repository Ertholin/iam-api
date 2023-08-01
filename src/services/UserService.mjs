import SingletonMixin from "../mixins/SingletonMixin.mjs"
import NotificationManager from "./NotificationManager.mjs"

class UserService{

    constructor(){
        this.entityManager = EntityManager.shared
        this.notificationManager = NotificationManager.shared
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

    create(data){
        const entity = new User(data)
        this.entityManager.create(entity)
    }
}

Object.assign(UserService.prototype.constructor, SingletonMixin)

export default UserService