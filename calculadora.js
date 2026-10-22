/* Interações da página; nenhum dado é enviado a serviços externos. */
(() => {
  "use strict";
  const modelo = window.ECOCalculadora;
  const form = document.querySelector("#form-calculadora");
  const status = document.querySelector("#calc-status");
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

  function processarDados(valores) {
    status.dataset.estado = "sucesso";
    status.textContent = "Dados válidos. Os consumos estão prontos para o cálculo.";
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    Object.values(campos).forEach(limparErro);
    const validacao = modelo.validar(lerFormulario());
    if (!validacao.valido) return mostrarErros(validacao.erros);
    processarDados(validacao.valores);
  });
  for (const campo of Object.values(campos)) campo.addEventListener("input", () => limparErro(campo));
  usaGas.addEventListener("change", atualizarGas);
  form.addEventListener("reset", () => {
    setTimeout(() => {
      atualizarGas();
      Object.values(campos).forEach(limparErro);
      status.textContent = "";
      delete status.dataset.estado;
    }, 0);
  });
  atualizarGas();
  document.querySelector("#calcular").disabled = false;
})();
