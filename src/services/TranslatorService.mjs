import ConfigurationService from "./ConfigurationService.mjs"
import en_us  from "../langs/en.mjs"


export default class TranslatorService{
    constructor(){
        this.configurationService = ConfigurationService.shared
        this.locale = this.configurationService.get('i18nFallbackLocale') ?? 'en'
        this.catalogs = {
            en: en_us 
        }
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

    get(keyword, placeholders){
        if(placeholders && Object.keys(placeholders).length > 0){
            return this.getTextWithParams(keyword, placeholders)
        }
        return this.getText(keyword)
    }

    getTextWithParams(keyword, placeholders){
        let text = this.getText(keyword)
        Object.keys(placeholders).forEach(key =>{
            text = text.replaceAll(`{_${key}_}`, placeholders[key])
        })
        return text
    }

    getText(keyword){
        const catalog = this.getCatalog(this.getLocale())
        const text = catalog[keyword]
        if(!text) {
            console.warn(`No text found for this key (${keyword})`)
        }
        return text ?? ''
    }

    getCatalog(locale){
        const catalog = this.catalogs[locale]
        if(!catalog) {
            throw Error(`No catalog for this locale(${locale})`)
        }
        return catalog
    }

    getLocale(){
        return this.locale
    }

    setLocale(locale){
        this.locale = locale
    }
}