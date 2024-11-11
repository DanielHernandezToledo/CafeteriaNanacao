const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  test("Código 200 y un array con un objeto como mínimo", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Código 404 para id inexistente", async () => {
    const id = 20;
    const jwt = "token";
    const response = await request(server)
      .delete(`/cafes/${id}`)
      .set("Authorization", jwt);
    expect(response.status).toBe(404);
  });

  test("Agregar nuevo café con código 201", async () => {
    const nuevoCafe = { id: 5, nombre: "Café con Milo" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  test("Código 400 cuando id de parámetros !== id en el payload", async () => {
    const idParametro = 1;
    const cafeActualizado = { id: 2, nombre: "Latte" };
    const response = await request(server).put(`/cafes/${idParametro}`).send(cafeActualizado);
    expect(response.status).toBe(400);
  });

});
