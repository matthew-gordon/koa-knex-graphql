exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      id: 1,
      firstName: 'Lisa',
      age: 20,
      company_id: 1
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 2,
      firstName: 'Matt',
      age: 30,
      company_id: 2
    })
  })
  .then(() => {
    return knex('users').insert({
      id: 3,
      firstName: 'Hannah',
      age: 30,
      company_id: 2
    })
  }).then(() => {
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
  });
}
