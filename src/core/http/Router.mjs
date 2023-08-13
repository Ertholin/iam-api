import ApiRoute from "../../routes/ApiRoute.mjs"
import http from 'http'
import ConfigurationService from "../../services/ConfigurationService.mjs"
import Request from "./Request.mjs"
import { request } from "http"
import Response from "./Response.mjs"
export default class Router{

    constructor(){
        this.routes = ApiRoute
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

    async createAppRequestFromNodeRequest(request) {
        const Url = new URL(`http://${request.protocol}://${request.url}`)
        let body = null
        try{
            body = await this.getRequestBodyAsJson(request)
        }catch(_e){}

        return new Request({
            body,
            ip: request.getHeader('x-forwarded-for'),
            host: request.host,
            method: request.method,
            headers: request.getHeaders(),
            protocol: request.protocol,
            hostname: url.hostname,
            baserUrl: url.host,
            path: request.path,
            query: url.searchParams
        })
    }

    getRequestBody(request){
        return new Promise((resolve, reject) => {
            let body = []
            request.on('data', (chunk) => {
            body.push(chunk)
            }).on('end', () => {
            body = Buffer.concat(body).toString()
            resolve(body)
            })
        })
    }

    async getRequestBodyAsJson(){
        const body = await this.getRequestBody(request)
        return JSON.parse(body)
    }

    async mapRouteToController(nodeRequest){
        const request = await this.createAppRequestFromNodeRequest(nodeRequest)
        const routes = this.buildRoute()
        const route = routes.find(v => v.path === request.path)
        if(!route){
            return new Response({ statusCode: Response.HTTP_CODE_NOT_FOUND })
        }

        if(route.method != request.method){
            return new Response({ statusCode: Response.HTTP_CODE_METHOD_NOT_ALLOWED })
        }

        if(route && route.method === request.method){
            return route.controller(request)
        }
    }

    buildRoute(){
        let routes = []
        this.routes.forEach(route => {
            if(route.children){
                route.children.forEach(child => {
                    routes.push({ path: `${route.path}${child.path}`, ...child})
                })
            } else {
                routes.push({ ...route })
            }
        })
    }

    createServer(){
        http.createServer(async (req, res) => {
            const response = await this.mapRouteToController(req)
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json' })
            res.end(response.content)
        }).listen(this.configurationService.get('serverPort'));
    }
}