const Router = require('koa-router')
const router = new Router()
const api = new Router()

const graphql = require('./graphql-router')

api.use(graphql)

router.use('/api', api.routes())

module.exports = router
