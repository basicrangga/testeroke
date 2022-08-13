require('dotenv').config()
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database/db.json')
const middlewares = jsonServer.defaults()

let {
  APP_PORT,
  APP_IP
} = process.env

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use(router)
server.listen(APP_PORT,APP_IP,() => {
  console.log(`JSON Server is running ${APP_IP}:${APP_PORT}`)
})