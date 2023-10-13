'use strict'

const fp = require('fastify-plugin')

const {
    DATABASE_USERS,
    DATABASE_PASSWORD,
    DATABASE_HOSTS,
    DATABASE_NAMES
} = process.env
/*
fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://lee:0000@localhost/library'
})
*/
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/mysql'), {
        connectionString: `mysql://${DATABASE_USERS}:${DATABASE_PASSWORD}@${DATABASE_HOSTS}/${DATABASE_NAMES}`
      })
})

