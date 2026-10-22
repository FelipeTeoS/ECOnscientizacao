/* Interações da página; sem envio de dados para serviços externos. */
(() => {
  "use strict";
  const form = document.querySelector("#form-calculadora");
  const usaGas = document.querySelector("#usa-gas");
  const duracaoGas = document.querySelector("#duracao-gas");
  function atualizarGas() {
    document.querySelector("#gas-campos").hidden = !usaGas.checked;
    duracaoGas.disabled = !usaGas.checked;
    duracaoGas.required = usaGas.checked;
  }
  usaGas.addEventListener("change", atualizarGas);
  form.addEventListener("reset", () => setTimeout(atualizarGas, 0));
  atualizarGas();
})();
