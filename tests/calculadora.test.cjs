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

test("converte combustível, rateia energia e GLP e projeta doze meses", () => {
  const resultado = modelo.calcular(entrada());
  assert.ok(Math.abs(resultado.categorias.transporte - 15.484) < 1e-10);
  assert.ok(Math.abs(resultado.categorias.energia - 1.54) < 1e-10);
  assert.ok(Math.abs(resultado.categorias.gas - 6.466698333333333) < 1e-10);
  assert.ok(Math.abs(resultado.total - 23.490698333333334) < 1e-10);
  assert.ok(Math.abs(resultado.anual - 281.88838) < 1e-8);
  assert.ok(Math.abs(resultado.biogenico - 4.578) < 1e-10);
});

test("zero consumo e GLP desativado não produzem NaN ou divisões por zero", () => {
  const resultado = modelo.calcular(entrada({ distancia: "0", eficiencia: "", energia: "0", usaGas: false, duracaoGas: "" }));
  assert.deepEqual(resultado.categorias, { transporte: 0, energia: 0, gas: 0 });
  assert.equal(resultado.total, 0);
  assert.equal(resultado.anual, 0);
  assert.throws(() => modelo.calcular(entrada({ moradores: "0" })), RangeError);
});

test("ratear a casa não divide o trajeto individual e dobrar a duração reduz o GLP à metade", () => {
  const a = modelo.calcular(entrada({ moradores: "1", duracaoGas: "30" }));
  const b = modelo.calcular(entrada({ moradores: "2", duracaoGas: "60" }));
  assert.equal(b.categorias.transporte, a.categorias.transporte);
  assert.equal(b.categorias.energia, a.categorias.energia / 2);
  assert.equal(b.categorias.gas, a.categorias.gas / 4);
});

test("cenário de referência fica imutável e comparação informa redução, aumento e igualdade", () => {
  const original = entrada();
  const base = modelo.calcular(original);
  original.distancia = "0";
  const menor = modelo.calcular(original);
  assert.equal(base.entrada.distancia, 100);
  assert.ok(Object.isFrozen(base) && Object.isFrozen(base.entrada) && Object.isFrozen(base.categorias));
  assert.equal(modelo.comparar(base, menor).direcao, "reducao");
  assert.ok(modelo.comparar(base, menor).diferenca < 0);
  assert.equal(modelo.comparar(menor, base).direcao, "aumento");
  assert.equal(modelo.comparar(base, base).direcao, "igual");
});

test("referência zero não gera percentual infinito", () => {
  const zero = modelo.calcular(entrada({ distancia: 0, energia: 0, usaGas: false }));
  const positivo = modelo.calcular(entrada());
  assert.equal(modelo.comparar(zero, positivo).percentual, null);
  assert.equal(modelo.comparar(zero, positivo).direcao, "aumento");
  assert.equal(modelo.comparar(zero, zero).direcao, "igual");
  assert.throws(() => modelo.comparar({ total: Infinity }, positivo), RangeError);
});

test("dicas acompanham a categoria dominante e não tratam zero informado como pegada zero", () => {
  const transporte = modelo.calcular(entrada({ energia: 0, usaGas: false }));
  assert.match(modelo.dicas(transporte)[0], /trajetos/);
  const gas = modelo.calcular(entrada({ distancia: 0, energia: 0 }));
  assert.match(modelo.dicas(gas)[0], /panelas/);
  const energia = modelo.calcular(entrada({ distancia: 0, usaGas: false }));
  assert.match(modelo.dicas(energia)[0], /aparelhos/);
  const zero = modelo.calcular(entrada({ distancia: 0, energia: 0, usaGas: false }));
  assert.match(modelo.dicas(zero)[0], /não representa sua pegada completa/);
});
