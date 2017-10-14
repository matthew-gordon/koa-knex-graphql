exports.up = function(knex, Promise) {
  return knex.schema

  .createTable('companies', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.text('description').unique().notNullable()
  })

  .createTable('users', (table) => {
    table.increments()
    table.string('firstName').notNullable()
    table.integer('age').notNullable()
    table.integer('company_id').defaultTo(null).references('companies.id')
      .onDelete('CASCADE')
  })

}

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('DROP TABLE IF EXISTS companies CASCADE;')
    .raw('DROP TABLE IF EXISTS users CASCADE;')
}
