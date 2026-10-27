const campoBusca = document.querySelector("#busca-artigos");
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const artigos = document.querySelectorAll("[data-artigo]");
const resultadoBusca = document.querySelector("#resultado-busca");
const mensagemSemResultados = document.querySelector(".sem-resultados");

const secaoDestaque = document
  .querySelector(".artigo-destaque")
  ?.closest(".secao");

const listaArtigos = document.querySelector(".lista-artigos");
const secaoLista = listaArtigos?.closest(".secao");

let categoriaSelecionada = "todos";

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function atualizarArtigos() {
  const termoBuscado = normalizarTexto(campoBusca.value);
  let quantidadeVisivel = 0;

  artigos.forEach((artigo) => {
    const categoria = artigo.dataset.categoria;
    const conteudo = normalizarTexto(artigo.textContent);

    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      categoria === categoriaSelecionada;

    const correspondeBusca =
      termoBuscado === "" ||
      conteudo.includes(termoBuscado);

    const deveAparecer =
      correspondeCategoria && correspondeBusca;

    artigo.hidden = !deveAparecer;

    if (deveAparecer) {
      quantidadeVisivel += 1;
    }
  });

  const destaqueVisivel = document.querySelector(
    ".artigo-destaque:not([hidden])"
  );

  const artigosDaListaVisiveis = listaArtigos.querySelector(
    "[data-artigo]:not([hidden])"
  );

   if (secaoDestaque) {
    secaoDestaque.hidden = !destaqueVisivel;
  }

  if (secaoLista) {
    secaoLista.hidden = !artigosDaListaVisiveis;
  }

  mensagemSemResultados.hidden = quantidadeVisivel !== 0;

  if (quantidadeVisivel === 1) {
    resultadoBusca.textContent = "1 artigo encontrado.";
  } else {
    resultadoBusca.textContent =
      `${quantidadeVisivel} artigos encontrados.`;
  }
}

campoBusca.addEventListener("input", atualizarArtigos);

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    categoriaSelecionada = botao.dataset.filtro;

    botoesFiltro.forEach((item) => {
      const estaSelecionado = item === botao;

      item.classList.toggle("filtro-ativo", estaSelecionado);
      item.setAttribute("aria-pressed", estaSelecionado);
    });

    atualizarArtigos();
  });
});

atualizarArtigos();