"use strict";

const Fastify = require("fastify");
const fp = require("fastify-plugin");
const databasePlugin = require("../../plugins/database");

// 테스트용 가짜 시크릿 정보
const fakeSecrets = {
  DATABASE_USERS: "testuser",
  DATABASE_PASSWORD: "testpassword",
  DATABASE_HOSTS: "testhost",
  DATABASE_NAMES: "testdb",
};

// 가짜 getSecrets 함수
const getSecrets = jest.fn().mockResolvedValue(fakeSecrets);

describe("Fastify MySQL Plugin Tests", () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();

    // Fastify 애플리케이션에 플러그인 등록 및 가짜 시크릿 함수 전달
    fastify.register(fp(databasePlugin, { getSecrets }));

    await fastify.ready();
  });

  afterAll(async () => {
    if (fastify) {
      await fastify.close();
    }
  });

  test("MySQL plugin should be registered", async () => {
    const { mysql } = fastify;
    expect(mysql).toBeDefined();
    // 이 부분에 예상 연결 문자열을 설정하세요.
    const expectedConnectionString = `mysql://${fakeSecrets.DATABASE_USERS}:${fakeSecrets.DATABASE_PASSWORD}@${fakeSecrets.DATABASE_HOSTS}/${fakeSecrets.DATABASE_NAMES}`;
    expect(mysql.config.connectionString).toEqual(expectedConnectionString);
  });

  test("MySQL connection should be successful", async () => {
    const { mysql } = fastify;

    // MySQL 연결을 테스트하는 추가 로직을 여기에 작성
    const result = await mysql.query("SELECT 1 + 1 as result");
    expect(result[0].result).toEqual(2);
  });
});
