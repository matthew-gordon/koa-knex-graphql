const graphql = require('graphql')
const _ = require('lodash')

const queries = require('../db/queries')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    paginatedUsers: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return queries.getAll()
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return queries.getSingle(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
