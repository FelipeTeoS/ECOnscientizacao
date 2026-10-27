// Tema claro/escuro do site. Carregado no <head> (sem defer) para aplicar o tema
// antes da primeira pintura e evitar o "piscar" de tela clara.
// Sem escolha salva, segue a preferência do sistema.
(function () {
  const CHAVE_TEMA = "econscientizacao-tema";
  const raiz = document.documentElement;
  const preferenciaEscura = window.matchMedia("(prefers-color-scheme: dark)");

  function lerTemaSalvo() {
    try {
      return localStorage.getItem(CHAVE_TEMA);
    } catch {
      return null;
    }
  }

  function salvarTema(tema) {
    try {
      localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
      // Sem armazenamento (navegação privada, por exemplo): o tema vale só nesta página.
    }
  }

  function temaAtual() {
    return raiz.dataset.tema === "escuro" ? "escuro" : "claro";
  }

  function aplicarTema(tema) {
    raiz.dataset.tema = tema;

    const botao = document.querySelector(".tema-botao");
    if (botao) {
      const escuro = tema === "escuro";
      botao.setAttribute("aria-pressed", String(escuro));
      botao.setAttribute("aria-label", escuro ? "Usar tema claro" : "Usar tema escuro");
      botao.title = botao.getAttribute("aria-label");
    }
  }

  aplicarTema(lerTemaSalvo() || (preferenciaEscura.matches ? "escuro" : "claro"));

  // Se a pessoa nunca escolheu, acompanha a mudança do sistema
  preferenciaEscura.addEventListener("change", (evento) => {
    if (!lerTemaSalvo()) {
      aplicarTema(evento.matches ? "escuro" : "claro");
    }
  });

  function criarBotao() {
    const menu = document.querySelector(".topo .menu");
    if (!menu) {
      return;
    }

    const item = document.createElement("li");
    item.innerHTML = `
      <button class="tema-botao" type="button">
        <svg class="icone-lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"/></svg>
        <svg class="icone-sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      </button>`;
    menu.append(item);

    const botao = item.querySelector(".tema-botao");
    botao.addEventListener("click", () => {
      const novoTema = temaAtual() === "escuro" ? "claro" : "escuro";
      salvarTema(novoTema);
      aplicarTema(novoTema);
    });

    aplicarTema(temaAtual());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", criarBotao);
  } else {
    criarBotao();
  }
})();
