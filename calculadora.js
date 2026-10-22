/* Interações da página; nenhum dado é enviado a serviços externos. */
(() => {
  "use strict";
  const modelo = window.ECOCalculadora;
  const form = document.querySelector("#form-calculadora");
  const status = document.querySelector("#calc-status");
  let resultadoAtual = null;
  let resultadoAtualizado = false;
  const numero = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const usaGas = document.querySelector("#usa-gas");
  const campos = {
    distancia: document.querySelector("#distancia"),
    eficiencia: document.querySelector("#eficiencia"),
    energia: document.querySelector("#energia"),
    moradores: document.querySelector("#moradores"),
    duracaoGas: document.querySelector("#duracao-gas")
  };

  function atualizarGas() {
    document.querySelector("#gas-campos").hidden = !usaGas.checked;
    campos.duracaoGas.disabled = !usaGas.checked;
    campos.duracaoGas.required = usaGas.checked;
    if (!usaGas.checked) limparErro(campos.duracaoGas);
  }

  function limparErro(campo) {
    campo.removeAttribute("aria-invalid");
    const mensagem = document.querySelector(`#${campo.id}-erro`);
    mensagem.hidden = true;
    mensagem.textContent = "";
  }

  function lerFormulario() {
    const entrada = { usaGas: usaGas.checked };
    for (const [nome, campo] of Object.entries(campos)) entrada[nome] = campo.value;
    return entrada;
  }

  function mostrarErros(erros) {
    for (const [nome, mensagem] of Object.entries(erros)) {
      const campo = campos[nome];
      campo.setAttribute("aria-invalid", "true");
      const aviso = document.querySelector(`#${campo.id}-erro`);
      aviso.textContent = mensagem;
      aviso.hidden = false;
    }
    status.dataset.estado = "erro";
    status.textContent = "Confira os campos destacados. Use vírgula ou ponto para decimais, sem separador de milhar.";
    campos[Object.keys(erros)[0]].focus();
  }

  function formatar(valor) {
    return valor > 0 && valor < 0.1 ? "< 0,1" : numero.format(valor);
  }

  function marcarDesatualizado() {
    if (!resultadoAtual) return;
    resultadoAtualizado = false;
    document.querySelector("#resultado-aviso").hidden = false;
    status.dataset.estado = "aviso";
    status.textContent = "Dados alterados. Calcule novamente para atualizar o resultado.";
  }

  function atualizarGrafico(resultado) {
    for (const [categoria, valor] of Object.entries(resultado.categorias)) {
      const percentual = resultado.total === 0 ? 0 : valor / resultado.total * 100;
      document.querySelector(`#valor-${categoria}`).textContent = `${formatar(valor)} kg`;
      document.querySelector(`#percentual-${categoria}`).textContent = `${Math.round(percentual)}%`;
      document.querySelector(`#barra-${categoria}`).style.width = `${percentual}%`;
    }
  }

  function processarDados(valores) {
    resultadoAtual = modelo.calcular(valores);
    resultadoAtualizado = true;
    document.querySelector("#resultado-vazio").hidden = true;
    document.querySelector("#resultado-conteudo").hidden = false;
    document.querySelector("#resultado-aviso").hidden = true;
    document.querySelector("#resultado-mensal").textContent = formatar(resultadoAtual.total);
    document.querySelector("#resultado-anual").textContent = formatar(resultadoAtual.anual);
    document.querySelector("#resultado-biogenico").textContent = formatar(resultadoAtual.biogenico);
    atualizarGrafico(resultadoAtual);
    status.dataset.estado = "sucesso";
    status.textContent = `Estimativa calculada: ${formatar(resultadoAtual.total)} kg de CO₂ por pessoa no mês e ${formatar(resultadoAtual.anual)} kg em 12 meses iguais.`;
    document.querySelector("#titulo-resultado").focus();
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    Object.values(campos).forEach(limparErro);
    const validacao = modelo.validar(lerFormulario());
    if (!validacao.valido) return mostrarErros(validacao.erros);
    processarDados(validacao.valores);
  });
  for (const campo of Object.values(campos)) campo.addEventListener("input", () => {
    limparErro(campo);
    marcarDesatualizado();
  });
  usaGas.addEventListener("change", () => {
    atualizarGas();
    marcarDesatualizado();
  });
  form.addEventListener("reset", () => {
    setTimeout(() => {
      atualizarGas();
      Object.values(campos).forEach(limparErro);
      resultadoAtual = null;
      resultadoAtualizado = false;
      document.querySelector("#resultado-vazio").hidden = false;
      document.querySelector("#resultado-conteudo").hidden = true;
      document.querySelector("#resultado-aviso").hidden = true;
      status.textContent = "";
      delete status.dataset.estado;
    }, 0);
  });
  atualizarGas();
  document.querySelector("#calcular").disabled = false;
})();
