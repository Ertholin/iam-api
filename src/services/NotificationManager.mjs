import { UserTokenTypeEnum } from "../models/UserToken.mjs"
import ConfigurationService from "./ConfigurationService.mjs"
import TranslatorService from "./TranslatorService.mjs"
import UserTokenService from "./UserTokenService.mjs"

export class EmailNotification{
    constructor({ email, object, body }){
        this.body = body
        this.email = email
        this.object = object
    }
}

export class PhoneNotification{
    constructor({ phone, body} ){
        this.phone = phone
        this.body = body
    }
}

export default class NotificationManager{
    constructor(){
        this.userTokenService = UserTokenService.shared
        this.translatorService = TranslatorService.shared
        this.configurationService = ConfigurationService.shared
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

    sendConfirmationLink({ id, email, phone }){
        let notification
        const expirationHours = this.configurationService.get('accountCreationConfirmationExpirationHours')
        const userToken = this.userTokenService.generateToken({ id }, UserTokenTypeEnum.ACCOUNT_CONFIRMATION, expirationHours)
        const link = `${this.configurationService.get('accountCreationConfirmationUrl')}?key=${userToken.uuid}`
        const linkText = this.translatorService.get('link')
        
        const object = this.translatorService.get('notification.account.creation_confirmation_object')
        const body = this.translatorService.get('notification.account.creation.creation_confirmation_body', { link, linkText })

        if (email) {
            notification = new EmailNotification({ email, object, body })
        } else {
            notification = new PhoneNotification({ phone, body })
        }

        this.send(notification)

    }

    send(data) {
        data.email ? this.sendEmail(data) : this.sendTexto(data)
    }

    sendEmail(emailNotification) {
        console.log('Notification sent via email', emailNotification)
    }

    sendTexto(phoneNotification){
        console.log('Notification sent via phone', phoneNotification)        
    }

}