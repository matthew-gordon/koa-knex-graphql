const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const app = new Koa()
const port = process.env.PORT || 3000
const router = new Router()

const GraphQLSchema = require('./graphql/schema')

app.use(bodyParser())

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql'}))
router.post('/graphql', graphqlKoa({ schema: GraphQLSchema}))

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

module.exports = server
