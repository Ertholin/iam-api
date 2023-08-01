export default {
    getInstance(){
        return new this()
    },
    get shared (){
        if(!this.singleton) {
            this.singleton = this.getInstance()
        }
        return this.singleton
    }
}