export default class Response{
    constructor({ statusCode = null, statusText = null, content = null, headers = {} }){
        this.statusCode = statusCode
        this.statusText = statusText
        this.content = content
        this.headers = headers
    }

    static HTTP_CODE_CREATED = 201
    static HTTP_CODE_NOT_FOUND = 404
    static HTTP_CODE_METHOD_NOT_ALLOWED = 405
    static HTTP_CODE_SERVER_ERROR = 500
}