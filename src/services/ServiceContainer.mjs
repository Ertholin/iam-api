export default class ServiceContainer {
    constructor () {
      this.singletons = {}
    }
  
    static getInstance () {
      return new this()
    }
  
    static get shared () {
      if (!this.singleton) {
        this.singleton = this.getInstance()
      }
      return this.singleton
    }
  
    get (className, dependancies, singleton = true) {
      if (singleton) {
        this.singletons[className] = this.singletons[className] ?? new className(dependancies)
        return this.singletons[className]
      }
      return new className(dependancies)
    }
  }