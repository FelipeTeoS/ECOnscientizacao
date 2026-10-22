/* Modelo puro compartilhado pela página e pelos testes de cálculo. */
(function (root, criarModelo) {
  "use strict";
  const modelo = criarModelo();
  if (typeof module === "object" && module.exports) module.exports = modelo;
  else root.ECOCalculadora = modelo;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function lerNumero(valor) {
    if (typeof valor === "number") return Number.isFinite(valor) ? valor : NaN;
    if (typeof valor !== "string") return NaN;
    const texto = valor.trim();
    if (!/^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(texto)) return NaN;
    const numero = Number(texto.replace(",", "."));
    return Number.isFinite(numero) ? numero : NaN;
  }

  function validar(entrada) {
    const valores = { usaGas: entrada.usaGas === true };
    const erros = {};
    const regras = [
      ["distancia", 0, 100000, false, "Informe a distância entre 0 e 100.000 km."],
      ["eficiencia", 0.1, 100, false, "Informe um consumo entre 0,1 e 100 km/L."],
      ["energia", 0, 100000, false, "Informe o consumo entre 0 e 100.000 kWh."],
      ["moradores", 1, 100, true, "Informe um número inteiro de 1 a 100 pessoas."],
      ["duracaoGas", 1, 3650, false, "Informe a duração entre 1 e 3.650 dias."]
    ];
    for (const [campo, minimo, maximo, inteiro, mensagem] of regras) {
      if ((campo === "eficiencia" && valores.distancia === 0) ||
          (campo === "duracaoGas" && !valores.usaGas)) {
        valores[campo] = 0;
        continue;
      }
      const valor = lerNumero(entrada[campo]);
      if (!Number.isFinite(valor) || valor < minimo || valor > maximo ||
          (inteiro && !Number.isInteger(valor))) erros[campo] = mensagem;
      valores[campo] = valor;
    }
    return { valido: Object.keys(erros).length === 0, valores, erros };
  }

  return Object.freeze({ lerNumero, validar });
});
