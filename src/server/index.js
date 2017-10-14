const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const app = new Koa()
const port = process.env.PORT || 3000

const routes = require('./routes')

app.use(bodyParser())
app.use(logger())

app.use(routes.routes())
app.use(routes.allowedMethods())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

module.exports = server
