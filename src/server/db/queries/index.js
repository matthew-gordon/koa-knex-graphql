const knex = require('../knex')

function getAll() {
  return knex('users').select()
}

function getSingle(id) {
  return knex('users')
    .first()
    .where({ id })
}

module.exports = {
  getAll,
  getSingle
}
