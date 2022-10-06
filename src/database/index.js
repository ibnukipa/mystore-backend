const knex = require('knex')
const knexFile = require('knexfile')

// TODO: the knexfile.development should be configurable based on env (dev, staging, or prod)
const db = knex(knexFile.development)

module.exports = db
