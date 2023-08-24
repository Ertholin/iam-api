export default class Request{
    constructor({ ip, body, path, method, query, route, params, headers, baseUrl, hostname, protocol }){
        this.ip = ip
        this.body = body
        this.path = path
        this.method = method
        this.query = query
        this.route = route
        this.params = params
        this.headers = headers
        this.baseUrl = baseUrl
        this.hostname = hostname
        this.protocol = protocol
    }
}