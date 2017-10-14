exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.text('firstName').notNullable().unique()
    table.integer('age')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
