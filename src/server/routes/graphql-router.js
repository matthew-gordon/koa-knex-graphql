const Router = require('koa-router')
const router = new Router()
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')
const GraphQLSchema = require('../graphql/schema')

router.get('/graphiql', graphiqlKoa({ endpointURL: '/api/graphql'}))
router.post('/graphql', graphqlKoa({ schema: GraphQLSchema}))

module.exports = router.routes()
