import request from 'supertest'
import app from '../app.js'


describe("POST /users", () => {
  describe("given a email and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users/login").send({
        email: "123@gmail.com",
        password: "123"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users/login").send({
        email: "123@gmail.com",
        password: "123"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  describe("when the email and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: "email"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users/login").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})