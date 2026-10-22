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

  /* Fontes, conversões e limites: CALCULADORA.md e a seção de metodologia. */
  const FATORES = Object.freeze({
    gasolina: 2.212 * 0.7,
    gasolinaBiogenica: 1.526 * 0.3,
    energia: 0.0385,
    glp: 47.3 * 63100 / 1000000,
    massaBotijao: 13,
    diasMes: 30
  });

  function calcular(entrada) {
    const validacao = validar(entrada);
    if (!validacao.valido) throw new RangeError("Dados inválidos para o cálculo.");
    const valores = validacao.valores;
    const litros = valores.distancia === 0 ? 0 : valores.distancia / valores.eficiencia;
    const categorias = Object.freeze({
      transporte: litros * FATORES.gasolina,
      energia: valores.energia * FATORES.energia / valores.moradores,
      gas: valores.usaGas
        ? FATORES.massaBotijao * FATORES.diasMes / valores.duracaoGas * FATORES.glp / valores.moradores
        : 0
    });
    const total = categorias.transporte + categorias.energia + categorias.gas;
    return Object.freeze({
      entrada: Object.freeze({ ...valores }),
      categorias,
      total,
      anual: total * 12,
      biogenico: litros * FATORES.gasolinaBiogenica
    });
  }

  function comparar(base, atual) {
    if (![base.total, atual.total].every((valor) => Number.isFinite(valor) && valor >= 0)) {
      throw new RangeError("Cenários inválidos para comparação.");
    }
    const diferenca = atual.total - base.total;
    const direcao = Math.abs(diferenca) < 1e-9 ? "igual" : diferenca < 0 ? "reducao" : "aumento";
    return Object.freeze({
      diferenca,
      direcao,
      percentual: base.total === 0 ? null : Math.abs(diferenca) / base.total * 100
    });
  }

  function dicas(resultado) {
    if (resultado.total === 0) return [
      "Você informou zero nas categorias calculadas. Isso não representa sua pegada completa.",
      "Confira se os consumos correspondem a um mês típico antes de comparar cenários."
    ];
    const mensagens = {
      transporte: "Para os trajetos em que for possível, experimente caminhar, pedalar ou combinar deslocamentos para reduzir os quilômetros de carro.",
      energia: "Observe quais aparelhos ficam ligados sem uso e prefira iluminação natural. Compare a conta de luz antes e depois da mudança.",
      gas: "Cozinhar com panelas tampadas e organizar o preparo das refeições pode ajudar o botijão a durar mais."
    };
    const principais = Object.entries(resultado.categorias)
      .filter(([, valor]) => valor > 0)
      .sort((a, b) => b[1] - a[1]);
    return principais.slice(0, 2).map(([categoria]) => mensagens[categoria]);
  }

  return Object.freeze({ lerNumero, validar, calcular, comparar, dicas, FATORES });
});
