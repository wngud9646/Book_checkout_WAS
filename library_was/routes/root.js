"use strict";

module.exports = async function (fastify) {
  fastify.get("/", async function (req, res) {
    return "도서 대출 관리 WAS";
  });
};
