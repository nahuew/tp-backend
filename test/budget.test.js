import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Budget from "../src/models/Budget.js";
import Job from "../src/models/Job.js";
import Director from "../src/models/Director.js";

let mongoServer;
let jobId;

// Setup
test("setup", async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  const director = await Director.create({ name: "Director Test", specialty: "Construcción" });
  const job = await Job.create({
    name: "Obra Test",
    location: "Buenos Aires",
    director_id: director._id,
    status: "planning"
  });
  jobId = job._id;
});

// ----------------------
// TESTS DEL MODELO BUDGET
// ----------------------
test("debe crear un presupuesto con datos válidos", async () => {
  const budget = await Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId
  });
  assert.ok(budget._id);
  assert.equal(budget.nameCustomer, "Cliente Test");
  assert.equal(budget.amountmo, 5000);
  assert.equal(budget.amountmat, 3000);
  assert.equal(budget.status, "waiting");
  await Budget.findByIdAndDelete(budget._id);
});

test("debe fallar si falta idCustomer", async () => {
  await assert.rejects(() => Budget.create({
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId
  }));
});

test("debe fallar si falta nameCustomer", async () => {
  await assert.rejects(() => Budget.create({
    idCustomer: 1,
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId
  }));
});

test("debe fallar si falta amountmo", async () => {
  await assert.rejects(() => Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmat: 3000,
    job_id: jobId
  }));
});

test("debe fallar si falta amountmat", async () => {
  await assert.rejects(() => Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    job_id: jobId
  }));
});

test("debe fallar si falta job_id", async () => {
  await assert.rejects(() => Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
  }));
});

test("el estado por defecto debe ser waiting", async () => {
  const budget = await Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId
  });
  assert.equal(budget.status, "waiting");
  await Budget.findByIdAndDelete(budget._id);
});

test("debe fallar con un estado no permitido", async () => {
  await assert.rejects(() => Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId,
    status: "pendiente"
  }));
});

test("el campo virtual amountot debe sumar amountmo y amountmat", async () => {
  const budget = await Budget.create({
    idCustomer: 1,
    nameCustomer: "Cliente Test",
    amountmo: 5000,
    amountmat: 3000,
    job_id: jobId
  });
  assert.equal(budget.amountot, 8000);
  await Budget.findByIdAndDelete(budget._id);
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
    assert.equal(budget.status, status);
    await Budget.findByIdAndDelete(budget._id);
  }
});

// Teardown
test("teardown", async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});