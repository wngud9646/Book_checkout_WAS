"use strict";

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const App = require("../app.js");

function build() {
  const app = Fastify();

  beforeAll(async () => {
    void app.register(fp(App));
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}


module.exports = {
  build: build
};