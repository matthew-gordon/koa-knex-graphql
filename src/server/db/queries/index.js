const knex = require('../knex')

module.exports = {

  users: {

    async getAll() {
      const result = await knex('users')
        .select()
        .orderBy('id', 'ASC')

      return result
    },

    async getSingle(id) {
      const result = await knex('users')
        .first()
        .where({ id })

      return result
    },

    async add(firstName, age) {
      let user = { firstName, age }

      const result = await knex('users')
        .insert(user)
        .returning('*')

      user = { ...result[0] }

      return user
    },

    async update(id, firstName, age, company_id) {
      let user = { firstName, age, company_id }

      const result = await knex('users')
        .update(user)
        .where({ id: parseInt(id) })
        .returning('*');

      user = { ...result[0] }

      return user
    },

    async delete(id) {
      const result = await knex('users')
        .del()
        .where({ id: parseInt(id) })
        .returning('*')

      let user = { ...result[0] }

      return user
    }
  },

  companies: {

    async getAll() {
      const result = await knex('companies')
        .select()
        .orderBy('id', 'ASC')

      return result
    },

    async getSingle(id) {
      const result = await knex('companies')
        .first()
        .where({ id })

      return result
    },

    async getUsers(companyId) {
      const result = await knex('users')
        .select()
        .where({ company_id: companyId })

      return result
    },

    async add(name, description) {
      let company = { name, description }

      const result = await knex('companies')
        .insert(company)
        .returning('*')

      company = { ...result[0] }

      return company
    },

    async update(id, name, description) {
      let company = { name, description }

      const result = await knex('companies')
        .update(company)
        .where({ id: parseInt(id) })
        .returning('*');

      company = { ...result[0] }

      return company
    },

    async delete(id) {
      const result = await knex('companies')
        .del()
        .where({ id: parseInt(id) })
        .returning('*')

      let company = { ...result[0] }

      return company
    }
  }
}
