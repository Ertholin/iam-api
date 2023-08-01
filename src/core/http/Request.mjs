export default class Response{
    constructor({ ip, body, path, query, route, params, headers, baseUrl, hostname }){
        this.ip = ip
        this.body = body
        this.path = path
        this.query = query
        this.route = route
        this.params = params
        this.headers = headers
        this.baseUrl = baseUrl
        this.hostname = hostname

    }
}