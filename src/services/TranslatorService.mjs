export default class TranslatorService{
    constructor(){}

    static getInstance(){
        return new this()
    }

    static get shared(){
        if(!this.singleton){
            this.singleton = this.getInstance()
        }
        return this.singleton
    }

    get(keyword, placeholders){
        return ''
    }
}