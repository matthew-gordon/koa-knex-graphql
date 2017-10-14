exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      id: 1,
      firstName: 'Lisa',
      age: 20
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 2,
      firstName: 'Matt',
      age: 30
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 3,
      firstName: 'Hannah',
      age: 30
    })
  })
}
