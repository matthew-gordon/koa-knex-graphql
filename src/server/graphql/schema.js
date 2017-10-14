const graphql = require('graphql')
const { users, companies } = require('../db/queries')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return companies.getUsers(parentValue.id)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return companies.getSingle(parentValue.company_id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    paginatedUsers: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return users.getAll()
      }
    },
    paginatedCompanies: {
      type: new GraphQLList(CompanyType),
      resolve(parentValue, args) {
        return companies.getAll()
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return users.getSingle(args.id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return companies.getSingle(args.id)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLInt }
      },
      resolve(parentValue, { firstName, age }) {
        return users.add(firstName, age)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, { id, firstName, age, companyId }) {
        return users.update(id, firstName, age, companyId)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return users.delete(args.id)
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name, description }) {
        return companies.add(name, description)
      }
    },
    updateCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id, name, description }) {
        return companies.update(id, name, description)
      }
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return companies.delete(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
