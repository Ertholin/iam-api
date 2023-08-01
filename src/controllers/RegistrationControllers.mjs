import Response from "../core/http/Response.mjs"
import UserService from "../services/UserService.mjs"

export default class RegistrationController{
    constructor(){
        this.userService = UserService.shared
    }

    register(request){
        try{
            this.userService.create(request.body)
            return new Response({ statusCode: Response.HTTP_CODE_CREATED })
        }catch(error) {
            console.log('An error has occured', error)
            return new Response({ statusCode: Response.HTTP_CODE_SERVER_ERROR })
        }
        return null
    }

}