// import ApiRoute from "../../routes/ApiRoute.mjs"
import http from 'http'
import ConfigurationService from "../../services/ConfigurationService.mjs"
// import Request from "./Request.mjs"
// import { request } from "http"
// import Response from "./Response.mjs"


import Request from './Request.mjs'
import Response from './Response.mjs'
import ApiRoute from "../../routes/ApiRoute.mjs"
import { $configurationService } from '../../services/ConfigurationService.mjs'


export default class Router{

    constructor() {
        this.routes = ApiRoute
        this.configurationService = $configurationService
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
    
      async createAppRequestFromNodeRequest(req) {
        const url = new URL(`${this.configurationService.get('baseUrl')}${req.url}`)
        let body = null
        try {
          body = await this.getRequestBodyAsJson(req)
        } catch (_e) {}
    
        return new Request({
          body,
          host: req.host,
          method: req.method,
          protocol: req.protocol,
          hostname: url.hostname,
          baseUrl: url.origin,
          path: url.pathname,
          // headers: req.headers,
          // ip: this.getUserIp(req),
          query: url.searchParams,
          // protocol: url.protocol.replace(':', ''),
        })
      }
    
      getUserIp(request) {
        return (request.headers['x-forwarded-for'] || '').split(',').shift() || (request.socket || {}).remoteAddress
      }
    
      getRequestBody(request) {
        return new Promise((resolve, reject) => {
          let body = []
          request.on('error', (err) => {
            reject(err)
          }).on('data', (chunk) => {
            body.push(chunk)
          }).on('end', () => {
            body = Buffer.concat(body).toString()
            resolve(body)
          })
        })
      }
    
      async getRequestBodyAsJson(request) {
        const body = await this.getRequestBody(request)
        return JSON.parse(body)
      }
    
      handle(req) {
        return this.mapRouteToController(req)
      }
    
      async mapRouteToController(nodeRequest) {
        const request = await this.createAppRequestFromNodeRequest(nodeRequest)
        const route = this.findRoute(request)
        if (!route) {
          return new Response({ statusCode: Response.HTTP_NOT_FOUND })
        }
        if (route.method.toLowerCase() !== request.method.toLowerCase()) {
          return new Response({ statusCode: Response.HTTP_METHOD_NOT_ALLOWED })
        }
        try {
          request.route = route
          const middlewareRequest = await this.middlewareRequestInterceptor(request)
          const response = await route.controller(middlewareRequest)
          return await this.middlewareResponseInterceptor(middlewareRequest, response)
        } catch (error) {
          console.log(error);
          return new Response({ ...error })
        }
      }
    
      async middlewareRequestInterceptor(request) {
        if ((request.route.middleware ?? []).length === 0) return request
        for (const mid of request.route.middleware) {
          request = await mid.handleRequest(request) ?? request
        }
        return request
      }
    
      async middlewareResponseInterceptor(request, response) {
        if ((request.route.middleware ?? []).length === 0) return response
        for (const mid of request.route.middleware) {
          response = await mid.handleResponse(request, response) ?? response
        }
        return response
      }
    
      findRoute(request) {
        const routes = this.buildRoute()
        return routes.find(item => {
          const params = []
          const routePath = item.path
            .split('/')
            .map(v => {
              if (v.includes(':')) {
                const key = v.replace(':', '')
                const rule = (item.rules ?? {})[key] ?? '[a-z0-9-_]+'
                params.push([key])
                return `(${rule})`
              }
              return v
            })
            .join('/')
          const matches = RegExp(`^${routePath}$`, 'g').exec(request.path) ?? []
          matches
            .filter((v) => !v.includes('/'))
            .forEach((match, i) => params[i].push(match))
          request.params = Object.fromEntries(params)
          return matches.length > 0
        })
      }
    
      buildRoute() {
        let flatRoutes = []
        this.routes.forEach(route => {
          if (route.children) {
            route.children.forEach(child => {
              flatRoutes.push({ ...child, path: `${route.path}${child.path}` })
            })
          } else {
            flatRoutes.push({ ...route })
          }
        })
        return flatRoutes
      }
    
    createServer(){
        http.createServer(async (req, res) => {
            const response = await this.mapRouteToController(req)
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json' })
            res.end(response.content)
        }).listen(this.configurationService.get('serverPort'), () => console.log('Server started from port', this.configurationService.get('serverPort')));
    }
}