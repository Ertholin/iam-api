import 'dotenv/config'
import Router from "./core/http/Router.mjs";

console.log("Dotenv: ", process.env);
const router = new Router()
router.createServer()