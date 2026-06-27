import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Budget from "../src/models/Budget.js";
import Job from "../src/models/Job.js";
import Director from "../src/models/Director.js";

let mongoServer;
let jobId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Crear director y obra de prueba
  const director = await Director.create({ name: "Director Test", specialty: "Construcción" });
  const job = await Job.create({
    name: "Obra Test",
    location: "Buenos Aires",
    director_id: director._id,
    status: "planning"
  });
  jobId = job._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Budget.deleteMany();
});

// ----------------------
// TESTS DEL MODELO BUDGET
// ----------------------
describe("Modelo Budget", () => {

  test("debe crear un presupuesto con datos válidos", async () => {
    const budget = await Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId
    });

    expect(budget._id).toBeDefined();
    expect(budget.nameCustomer).toBe("Cliente Test");
    expect(budget.amountmo).toBe(5000);
    expect(budget.amountmat).toBe(3000);
    expect(budget.status).toBe("waiting");
  });

  test("debe fallar si falta idCustomer", async () => {
    await expect(Budget.create({
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId
    })).rejects.toThrow();
  });

  test("debe fallar si falta nameCustomer", async () => {
    await expect(Budget.create({
      idCustomer: 1,
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId
    })).rejects.toThrow();
  });

  test("debe fallar si falta amountmo", async () => {
    await expect(Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmat: 3000,
      job_id: jobId
    })).rejects.toThrow();
  });

  test("debe fallar si falta amountmat", async () => {
    await expect(Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      job_id: jobId
    })).rejects.toThrow();
  });

  test("debe fallar si falta job_id", async () => {
    await expect(Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
    })).rejects.toThrow();
  });

  test("el estado por defecto debe ser waiting", async () => {
    const budget = await Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId
    });

    expect(budget.status).toBe("waiting");
  });

  test("debe fallar con un estado no permitido", async () => {
    await expect(Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId,
      status: "pendiente" // No está en el enum
    })).rejects.toThrow();
  });

  test("el campo virtual amountot debe sumar amountmo y amountmat", async () => {
    const budget = await Budget.create({
      idCustomer: 1,
      nameCustomer: "Cliente Test",
      amountmo: 5000,
      amountmat: 3000,
      job_id: jobId
    });

    expect(budget.amountot).toBe(8000);
  });

  test("debe aceptar todos los estados válidos", async () => {
    const estados = ["waiting", "approved", "rejected"];

    for (const status of estados) {
      const budget = await Budget.create({
        idCustomer: 1,
        nameCustomer: `Cliente ${status}`,
        amountmo: 1000,
        amountmat: 500,
        job_id: jobId,
        status
      });
      expect(budget.status).toBe(status);
      await Budget.findByIdAndDelete(budget._id);
    }
  });

});