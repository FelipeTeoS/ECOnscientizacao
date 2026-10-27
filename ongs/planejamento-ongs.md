# Guia de páginas: ONGs que ajudam a construir um mundo melhor

## Objetivo

Apresentar em uma página única (`ongs.html`) organizações que atuam pela
conservação ambiental no Brasil. A página é organizada em **seções temáticas**;
cada seção resume a causa e lista as organizações em cartões que levam ao canal
oficial de doação ou apoio financeiro.

As organizações e os links abaixo foram consultados em outubro de 2026. Antes de
publicar, confirme os links e as formas de contribuição nos canais oficiais,
pois podem mudar.

## Estrutura da página

Arquivo principal: `ongs.html`, com estilo global do site (`../style.css`) e
complementos locais em `ongs.css`. A página não depende de JavaScript. Os
desenhos de linha dos cartões são SVGs embutidos no HTML, os fundos próprios da
página ficam em `fundos/` e os logos oficiais em `logos/`.

1. **Título e chamada:** apresenta a proposta em linguagem simples, sem botões
   de atalho ou filtros no topo.
2. **Como escolher (`#como-apoiar`):** antes de conhecer as organizações, orienta
   a escolha da causa, a verificação de transparência (CNPJ, relatórios) e a
   confirmação dos canais oficiais antes de doar.
3. **Seção Florestas, clima e restauração (`#florestas`):** quatro cartões de
   organizações com logo oficial, nome, resumo curto e link para o site oficial.
4. **Seção Biodiversidade, fauna e biomas (`#biodiversidade`):** quatro cartões
   no mesmo formato da seção anterior, seguidos pela nota sobre as marcas.
5. **Aviso de segurança:** orientar que doações sejam feitas somente pelos
   canais oficiais.
6. **Navegação:** menu do site para início e demais páginas.

Se a lista de organizações crescer em futuro próximo, avaliar voltar à ideia de
arquivos temáticos separados.

## Logos nos cartões

- **Conteúdo:** cada um dos oito cartões exibe o logo oficial da organização no
  topo, ao lado da etiqueta de tema. Não há faixa de logos na abertura.
- **Arquivos:** ficam em `logos/`, com nomes que identificam a organização e sem
  edição de cor, recorte ou redesenho. O `LEIA-ME.md` da pasta registra as fontes
  e as condições de uso.
- **Leiaute:** o logo fica em uma placa branca de 120 × 46 px, com a imagem
  limitada a 104 × 34 px e `object-fit: contain`. A etiqueta de tema fica ao
  lado; em telas estreitas, o conjunto quebra em duas linhas sem rolagem
  horizontal.
- **Identificação:** uma nota discreta depois dos cartões informa que os logos
  são usados apenas para identificação e que as marcas pertencem às
  organizações.
- **Sem JavaScript:** os cartões e os logos são HTML e CSS puros, assim como o
  restante da página.

## Organizações — Florestas, clima e restauração

| Organização | Resumo para o cartão | Canal oficial para doar |
|---|---|---|
| SOS Mata Atlântica | Atua na conservação e restauração da Mata Atlântica, proteção da água e valorização de áreas protegidas. | [Doação SOS Mata Atlântica](https://sosma.org.br/doacao) |
| WWF-Brasil | Trabalha com conservação e restauração, biodiversidade, justiça socioambiental e mobilização da sociedade. | [Como apoiar o WWF-Brasil](https://www.wwf.org.br/participe/como_apoiar/) |
| Greenpeace Brasil | Mobiliza campanhas e ações ambientais relacionadas a florestas, clima e biodiversidade. | [Como fazer uma doação ao Greenpeace](https://www.greenpeace.org/brasil/como-ajudar/faca-uma-doacao/) |
| Instituto Terra | Apoia restauração ecossistêmica, educação ambiental e desenvolvimento rural sustentável. | [Doe ao Instituto Terra](https://institutoterra.org/doe/) |

## Organizações — Biodiversidade, fauna e biomas

| Organização | Resumo para o cartão | Canal oficial para doar |
|---|---|---|
| IPÊ — Instituto de Pesquisas Ecológicas | Desenvolve pesquisa e projetos para conservação da biodiversidade brasileira e transformação socioambiental. | [Doe ao IPÊ](https://ipe.org.br/?page_id=6628) |
| Instituto Arara Azul | Trabalha com pesquisa, manejo e conservação da arara-azul e da biodiversidade, especialmente no Pantanal. | [Faça uma doação ao Instituto Arara Azul](https://www.institutoararaazul.org.br/apoie/faca-uma-doacao/) |
| Onçafari | Atua na conservação da biodiversidade e de espécies como onças-pintadas e lobos-guarás, em diferentes biomas. | [Doe ao Onçafari](https://oncafari.org/doe-agora/) |
| Associação Caatinga | Desenvolve ações para conservar a Caatinga e apoiar o desenvolvimento sustentável de comunidades do semiárido. | [Proteja a Caatinga](https://www.acaatinga.org.br/proteja-a-caatinga/) |

## Como apoiar com consciência

Textos de apoio usados na seção “Como escolher”:

1. Escolher uma causa ambiental importante para você.
2. Ler sobre os projetos e a atuação da organização em seus canais oficiais.
3. Conferir a transparência: CNPJ ativo, relatórios e prestações de contas
   publicados.
4. Ver as opções de doação, voluntariado ou participação disponíveis.
5. Antes de contribuir, confirmar que está no site oficial da organização.

> Apoie com consciência: conheça os projetos, consulte as informações
> institucionais e confirme se está no canal oficial antes de fazer uma doação.
> Contribuir também pode significar divulgar campanhas, participar de ações ou
> se voluntariar.

## Padrão visual

- Reutilizar `style.css`, cabeçalho, logotipo, menu e rodapé do site.
- Manter os cartões com bordas arredondadas, fundos claros e paleta verde já
  usada no ECOnscientização; complementos de estilo em `ongs.css`.
- O cartão inteiro é um link para o site oficial, com foco visível e sem
  esconder o conteúdo pastel.
- Cada cartão tem, no topo, o logo oficial em uma placa branca e uma etiqueta de
  tema. No rodapé, um desenho de linha (Lucide, ISC) em SVG embutido, inteiro,
  num espaço próprio ao lado do link. O traço usa a cor cheia do cartão, sem
  recorte e sem sobrepor o texto.
- Dar destaque visual ao tema de cada seção com um selo, como “Florestas e
  clima” ou “Biodiversidade”.
- A abertura usa `fundos/paisagem-ongs.svg`, uma paisagem original em SVG com
  céu, sol, colinas e traços botânicos, suavizada por um degradê na base. Em
  telas estreitas, a imagem é dimensionada por `100% auto` para não cortar o
  desenho.
- As seções e o rodapé recebem o padrão botânico discreto de
  `fundos/padrao-ongs.svg`; os cartões continuam opacos para preservar o
  contraste. O cabeçalho fica translúcido sobre a paisagem, com fallback opaco
  em `prefers-reduced-transparency`.
- O rodapé é fechado por uma borda de grama desenhada em SVG, alinhada ao
  restante da identidade visual.
- Usar links de doação com rótulos claros e acessíveis, por exemplo: “Visitar
  site oficial”, sempre com o nome da organização no `aria-label`.
- Abrir links externos em nova aba com `target="_blank"` e
  `rel="noopener noreferrer"`; o rótulo acessível informa “abre em nova aba”.
- Não prometer impacto específico para cada valor doado sem confirmação da
  própria organização.

## Fontes oficiais consultadas

- [SOS Mata Atlântica — doação](https://sosma.org.br/doacao)
- [WWF-Brasil — como apoiar](https://www.wwf.org.br/participe/como_apoiar/)
- [Greenpeace Brasil — doação](https://www.greenpeace.org/brasil/como-ajudar/faca-uma-doacao/)
- [Instituto Terra — doação](https://institutoterra.org/doe/)
- [IPÊ — doação](https://ipe.org.br/?page_id=6628)
- [Instituto Arara Azul — doação](https://www.institutoararaazul.org.br/apoie/faca-uma-doacao/)
- [Onçafari — doe agora](https://oncafari.org/doe-agora/)
- [Associação Caatinga — proteja a Caatinga](https://www.acaatinga.org.br/proteja-a-caatinga/)
