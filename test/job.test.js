import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Job from "../src/models/Job.js";
import Director from "../src/models/Director.js";

let mongoServer;
let directorId;

// Antes de todos los tests: levantar MongoDB en memoria
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Crear un director de prueba para usar en las obras
  const director = await Director.create({ name: "Director Test", specialty: "Construcción" });
  directorId = director._id;
});

// Después de todos los tests: cerrar conexión
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Limpiar obras entre cada test
afterEach(async () => {
  await Job.deleteMany();
});

// ----------------------
// TESTS DEL MODELO JOB
// ----------------------
describe("Modelo Job", () => {

  test("debe crear una obra con datos válidos", async () => {
    const job = await Job.create({
      name: "Obra Test",
      location: "Buenos Aires",
      director_id: directorId,
      status: "planning"
    });

    expect(job._id).toBeDefined();
    expect(job.name).toBe("Obra Test");
    expect(job.location).toBe("Buenos Aires");
    expect(job.status).toBe("planning");
  });

  test("debe fallar si falta el nombre", async () => {
    await expect(Job.create({
      location: "Córdoba",
      director_id: directorId,
    })).rejects.toThrow();
  });

  test("debe fallar si falta la ubicación", async () => {
    await expect(Job.create({
      name: "Obra sin ubicación",
      director_id: directorId,
    })).rejects.toThrow();
  });

  test("debe fallar si falta el director", async () => {
    await expect(Job.create({
      name: "Obra sin director",
      location: "Mendoza",
    })).rejects.toThrow();
  });

  test("debe fallar con una ubicación no permitida", async () => {
    await expect(Job.create({
      name: "Obra inválida",
      location: "Rosario", // No está en el enum
      director_id: directorId,
    })).rejects.toThrow();
  });

  test("debe fallar con un estado no permitido", async () => {
    await expect(Job.create({
      name: "Obra inválida",
      location: "Santa Fe",
      director_id: directorId,
      status: "terminada" // No está en el enum
    })).rejects.toThrow();
  });

  test("el estado por defecto debe ser planning", async () => {
    const job = await Job.create({
      name: "Obra sin estado",
      location: "Mendoza",
      director_id: directorId,
    });

    expect(job.status).toBe("planning");
  });

  test("debe aceptar todos los estados válidos", async () => {
    const estados = ["planning", "active", "completed", "cancelled"];

    for (const status of estados) {
      const job = await Job.create({
        name: `Obra ${status}`,
        location: "Córdoba",
        director_id: directorId,
        status
      });
      expect(job.status).toBe(status);
      await Job.findByIdAndDelete(job._id);
    }
  });

});