import request from "supertest";
import server from "..";

describe("app test", () => {
  afterAll(() => {
    server.close();
  });

  test("home route", async () => {
    const res = await request(server).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("homeText");
    expect(res.body.homeText).toBe("My super home text");
  });
});
