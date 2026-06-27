import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Job from "../src/models/Job.js";
import Director from "../src/models/Director.js";

let mongoServer;
let directorId;

// Setup
test("setup", async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  const director = await Director.create({ name: "Director Test", specialty: "Construcción" });
  directorId = director._id;
});

// ----------------------
// TESTS DEL MODELO JOB
// ----------------------
test("debe crear una obra con datos válidos", async () => {
  const job = await Job.create({
    name: "Obra Test",
    location: "Buenos Aires",
    director_id: directorId,
    status: "planning"
  });
  assert.ok(job._id);
  assert.equal(job.name, "Obra Test");
  assert.equal(job.location, "Buenos Aires");
  assert.equal(job.status, "planning");
  await Job.findByIdAndDelete(job._id);
});

test("debe fallar si falta el nombre", async () => {
  await assert.rejects(() => Job.create({
    location: "Córdoba",
    director_id: directorId,
  }));
});

test("debe fallar si falta la ubicación", async () => {
  await assert.rejects(() => Job.create({
    name: "Obra sin ubicación",
    director_id: directorId,
  }));
});

test("debe fallar si falta el director", async () => {
  await assert.rejects(() => Job.create({
    name: "Obra sin director",
    location: "Mendoza",
  }));
});

test("debe fallar con una ubicación no permitida", async () => {
  await assert.rejects(() => Job.create({
    name: "Obra inválida",
    location: "Rosario",
    director_id: directorId,
  }));
});

test("debe fallar con un estado no permitido", async () => {
  await assert.rejects(() => Job.create({
    name: "Obra inválida",
    location: "Santa Fe",
    director_id: directorId,
    status: "terminada"
  }));
});

test("el estado por defecto debe ser planning", async () => {
  const job = await Job.create({
    name: "Obra sin estado",
    location: "Mendoza",
    director_id: directorId,
  });
  assert.equal(job.status, "planning");
  await Job.findByIdAndDelete(job._id);
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
    assert.equal(job.status, status);
    await Job.findByIdAndDelete(job._id);
  }
});

// Teardown
test("teardown", async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});