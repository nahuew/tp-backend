import { validatePassword } from "../src/utils/validators.js";
import { hashPassword, comparePassword } from "../src/utils/password.js";

// ----------------------
// TESTS DE validacion de password
// ----------------------
describe("validatePassword", () => {

  test("debe rechazar una contraseña corta", () => {
    expect(validatePassword("Ab1!")).toBe(false);
  });

  test("debe rechazar una contraseña sin mayúscula", () => {
    expect(validatePassword("abcdef1!")).toBe(false);
  });

  test("debe rechazar una contraseña sin minúscula", () => {
    expect(validatePassword("ABCDEF1!")).toBe(false);
  });

  test("debe rechazar una contraseña sin caracter especial", () => {
    expect(validatePassword("Abcdefgh1")).toBe(false);
  });

  test("debe aceptar una contraseña válida", () => {
    expect(validatePassword("Abcdef1!")).toBe(true);
  });

});

// ----------------------
// TESTS DE hashPassword y comparePassword
// ----------------------
describe("hashPassword y comparePassword", () => {

  test("debe encriptar la contraseña correctamente", async () => {
    const hash = await hashPassword("Abcdef1!");
    expect(hash).not.toBe("Abcdef1!"); // el hash no es igual al original
    expect(hash.length).toBeGreaterThan(0);
  });

  test("debe verificar correctamente una contraseña válida", async () => {
    const hash = await hashPassword("Abcdef1!");
    const resultado = await comparePassword("Abcdef1!", hash);
    expect(resultado).toBe(true);
  });

  test("debe rechazar una contraseña incorrecta", async () => {
    const hash = await hashPassword("Abcdef1!");
    const resultado = await comparePassword("OtraPassword1!", hash);
    expect(resultado).toBe(false);
  });

});