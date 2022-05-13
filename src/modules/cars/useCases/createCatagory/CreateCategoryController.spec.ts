import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { app } from "@shared/infra/http/app";

import request from "supertest";

let connection: Connection;
describe("Create Category Controller", () => {
  const admin = {
    id: uuidV4(),
    password: hash("admin", 8),
  };
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    await connection.query(
      `INSERT INTO USERS (id, name, password, email, "isAdmin", created_at, driver_license) VALUES ('${
        admin.id
      }', 'admin', '${await admin.password}', 'admin@admin.com' , true, 'now()', 'XXX.XXX.XXX-XX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "category supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });
});
