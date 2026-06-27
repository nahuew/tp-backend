import test from "node:test";
import assert from "node:assert/strict";
import { validatePassword } from "../src/utils/validators.js";
import { hashPassword, comparePassword } from "../src/utils/password.js";

// ----------------------
// TESTS DE hashPassword y comparePassword
// ----------------------
test("debe encriptar la contraseña correctamente", async () => {
  const hash = await hashPassword("Abcdef1!");
  assert.notEqual(hash, "Abcdef1!");
  assert.ok(hash.length > 0);
});

test("debe verificar correctamente una contraseña válida", async () => {
  const hash = await hashPassword("Abcdef1!");
  const resultado = await comparePassword("Abcdef1!", hash);
  assert.equal(resultado, true);
});

test("debe rechazar una contraseña incorrecta", async () => {
  const hash = await hashPassword("Abcdef1!");
  const resultado = await comparePassword("OtraPassword1!", hash);
  assert.equal(resultado, false);
});