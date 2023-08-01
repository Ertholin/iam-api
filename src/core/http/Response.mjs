export default class Response{
    constructor({ statusCode = null, statusText = null, content = null, headers = {} }){
        this.statusCode = statusCode,
        this.statusText = statusText,
        this.content = content,
        this.headers = headers
    }

    static HTTP_CODE_CREATED = 201
}