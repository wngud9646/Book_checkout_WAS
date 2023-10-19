"use strict";

const fp = require("fastify-plugin");
const { getSecrets } = require("./secret");

const secretName = "codetest";

/*
fastify.register(require('@fastify/mysql'), {
  connectionString: 'mysql://lee:0000@localhost/library'
})
*/
module.exports = fp(async function (fastify) {
  const secrets = await getSecrets(secretName);

  const user = secrets.DATABASE_USERS;
  const password = secrets.DATABASE_PASSWORD;
  const host = secrets.DATABASE_HOSTS;
  const database = secrets.DATABASE_NAMES;

  fastify.register(require("@fastify/mysql"), {
    connectionString: `mysql://${user}:${password}@${host}/${database}`,
  });
});
