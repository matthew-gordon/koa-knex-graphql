exports.seed = (knex, Promise) => {
  return knex('companies').del()
  .then(() => {
    return knex('companies').insert({
      id: 1,
      name: 'apple',
      description: 'swift',
    })
  })
  .then(() => {
    return knex('companies').insert({
      id: 2,
      name: 'google',
      description: 'angular',
    })
  }).then(() => {
    return knex.raw("SELECT setval('companies_id_seq', (SELECT MAX(id) FROM companies))");
  });
}
