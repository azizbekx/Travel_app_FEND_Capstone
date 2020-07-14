import 'regenerator-runtime/runtime'
const request = require("supertest");
const server = require("../server/server");


describe("Test root path", () => {
  test("response should get method '/'", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });
});




