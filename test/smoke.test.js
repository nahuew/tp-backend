import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import pug from "pug";

import { validatePassword } from "../src/utils/validators.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const viewsDir = path.join(projectRoot, "src", "views");
const publicDir = path.join(projectRoot, "src", "public");

test("all Pug views compile", () => {
  const viewFiles = fs
    .readdirSync(viewsDir)
    .filter((file) => file.endsWith(".pug"));

  assert.ok(viewFiles.length > 0, "Expected at least one Pug view");

  for (const file of viewFiles) {
    assert.doesNotThrow(() => {
      pug.compileFile(path.join(viewsDir, file));
    }, `${file} should compile`);
  }
});

test("local assets referenced by views exist", () => {
  const viewFiles = fs
    .readdirSync(viewsDir)
    .filter((file) => file.endsWith(".pug"));
  const localAssetPattern = /(?:src|href)="\/(css|js|images)\/([^"]+)"/g;

  for (const file of viewFiles) {
    const content = fs.readFileSync(path.join(viewsDir, file), "utf8");
    const matches = content.matchAll(localAssetPattern);

    for (const match of matches) {
      const assetPath = path.join(publicDir, match[1], match[2]);
      assert.ok(fs.existsSync(assetPath), `${file} references missing asset /${match[1]}/${match[2]}`);
    }
  }
});

test("password validator enforces project rules", () => {
  assert.equal(validatePassword("Abcdefg!"), true);
  assert.equal(validatePassword("abcdefg!"), false);
  assert.equal(validatePassword("ABCDEFG!"), false);
  assert.equal(validatePassword("Abcdefgh"), false);
  assert.equal(validatePassword("Abc!"), false);
});

//test para verificar los campos requeridos en las vistas de Presupuesto//

test("el formulario de presupuesto tiene campos requeridos", () => {
  const html = pug.renderFile(
    path.join(viewsDir, "newBudget.pug"),
    { jobs: [], user: null }
  );

  assert.ok(html.includes('name="amountmo"') && html.includes("required"));
  assert.ok(html.includes('name="amountmat"') && html.includes("required"));
  assert.ok(html.includes('name="nameCustomer"') && html.includes("required"));
  assert.ok(html.includes('name="idCustomer"') && html.includes("required"));
});

//test para verificar los campos requeridos en las vistas de obras//

test("el formulario de obra tiene campos requeridos", () => {
  const html = pug.renderFile(
    path.join(viewsDir, "newJob.pug"),
    { directors: [], user: null }
  );

  assert.ok(html.includes('name="name"') && html.includes("required"));
  assert.ok(html.includes('name="location"') && html.includes("required"));
  assert.ok(html.includes('name="director_id"') && html.includes("required"));
  assert.ok(html.includes('name="startDate"') && html.includes("required"));
  assert.ok(html.includes('name="estimateEndDate"') && html.includes("required"));
});