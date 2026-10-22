"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const modelo = require("../calculadora-modelo.js");
const entrada = (extras = {}) => ({ distancia: "100", eficiencia: "10", energia: "120", moradores: "3", usaGas: true, duracaoGas: "60", ...extras });

test("aceita decimais com vírgula ou ponto sem consumir texto inválido", () => {
  assert.equal(modelo.lerNumero(" 12,5 "), 12.5);
  assert.equal(modelo.lerNumero("12.5"), 12.5);
  for (const valor of ["", " ", "12km", "1,2,3", "1.000,5", "1e3", "Infinity", NaN, Infinity, null, true]) {
    assert.ok(Number.isNaN(modelo.lerNumero(valor)), String(valor));
  }
});

test("rejeita valores negativos, divisores inválidos e moradores fracionados", () => {
  for (const extras of [{ distancia: "-1" }, { eficiencia: "0" }, { energia: "-2" }, { moradores: "0" }, { moradores: "2,5" }, { duracaoGas: "0" }]) {
    assert.equal(modelo.validar(entrada(extras)).valido, false, JSON.stringify(extras));
  }
});

test("campos de atividades não informadas não bloqueiam a estimativa", () => {
  const validacao = modelo.validar(entrada({ distancia: "0", eficiencia: "", usaGas: false, duracaoGas: "" }));
  assert.equal(validacao.valido, true);
  assert.equal(validacao.valores.eficiencia, 0);
  assert.equal(validacao.valores.duracaoGas, 0);
});
