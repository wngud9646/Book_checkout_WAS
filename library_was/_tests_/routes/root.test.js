"use strict";

const { build } = require("../helper")

test("default root route", async () => {
  const app = build();
  const res = await app.inject({
    url: "/",
  });
  expect(res.payload).toEqual("도서 대출 관리 WAS");
});