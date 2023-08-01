export default class EntityManager{
    constructor(){

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


    create(data) {
        console.log('Data persisted in DB', data)
    }
    
    update(data) {}

    delete(data) {}
    
    list(data) {}
    
    read(data) {}

}