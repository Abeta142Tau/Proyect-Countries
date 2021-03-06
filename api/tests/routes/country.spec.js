/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const country = {
  id: "ARE",
  name: "Argentina",
  flagImage: "https://flagcdn.com/w320/ar.png",
  continents: "South America",
  capital: "Buenos Aires",
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Country.sync({ force: true }).then(() => Country.create(country))
  );
  describe("GET /countries", () => {
    //it("should get 200", () => agent.get("/countries").expect(200));
  });
  describe("GET /countries/:id", () => {
    it("should get 200", () =>
      agent.get(`/countries/${country.id}`).expect(200));
  });
  it("expects content type to be  JSON", () => {
    agent.get("/countries/:id").expect("Content-Type", /json/);
  });
});
