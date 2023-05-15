const {app} = require("../Index");
const request = require("supertest");
const process = require('process')

describe("User API", () => {
  let token;

  beforeAll((done) => {
    done();
  });

  describe("POST /register", () => {
    it("registers a new Recruiter", async () => {
      const newUser = {
        name: "rahul sharma",
        email: "rahul.sharma@gmail.com",
        password: "1234",
      };

      const response = await request(app).post("/register").send(newUser);
      expect(response.status).toBe(400);
    }, 30000);

    it("returns an error if required fields are missing", async () => {
      const newUser = {
        name: "rahul sharma",
        email: "sharmarahul@gmail.com",
        password: "1234688",
      };

      const response = await request(app)
        .post("/register")
        .send(newUser)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    }, 20000);
  });

  describe("POST /login", () => {
    it("logs in a user with valid credentials", async () => {
      const credentials = {
        email: "sanjumehla@gmail.com",
        password: "mehlasaab",
      };

      const response = await request(app)
        .post("/login")
        .send(credentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("type");
    },2000);

    it("returns an error for invalid credentials", async () => {
      const credentials = {
        email: "sharama99.Shrarmvasbvjftava@gmail.com",
        password: "123cvhd45678",
      };

      const response = await request(app)
        .post("/login")
        .send(credentials);

      expect(response.status).toBe(401);
    },20000);
  });

  afterAll(() => setTimeout(() => process.exit(), 1000));
});