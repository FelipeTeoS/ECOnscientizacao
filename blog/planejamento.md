# Planejamento do blog — ECOnscientização

## Objetivo

Compartilhar conteúdos educativos sobre meio ambiente,
incentivando hábitos mais conscientes no cotidiano.

## Público

Pessoas interessadas em aprender sobre sustentabilidade,
por meio de uma linguagem simples e acessível.

## Estrutura implementada

A página principal do blog possui:

- Cabeçalho integrado às demais páginas do site.
- Apresentação do blog.
- Artigo em destaque.
- Cartões com categoria, título, resumo e link.
- Rodapé integrado à identidade visual do projeto.
- Layout adaptável para diferentes tamanhos de tela.
- Campo de busca por palavras.
- Filtros por categoria.
- Contagem de artigos encontrados.
- Mensagem quando nenhum artigo corresponde à pesquisa.

## Artigos implementados

1. Consumo consciente de água.
2. Resíduos e reciclagem.
3. Biodiversidade e preservação.

Cada artigo possui:

- Página própria.
- Categoria.
- Título e introdução.
- Conteúdo dividido em seções.
- Lista de orientações quando necessária.
- Fontes e referências.
- Link de retorno ao blog.
- Cabeçalho e rodapé compartilhados com o site.

## Organização dos arquivos

- `blog/index.html`: página principal do blog.
- `blog/style.css`: estilos específicos do blog e dos artigos.
- `blog/planejamento.md`: planejamento e registro da implementação.
- `blog/modelo-artigo/index.html`: modelo para novos artigos.
- `blog/consumo-de-agua/index.html`: artigo sobre água.
- `blog/reciclagem/index.html`: artigo sobre reciclagem.
- `blog/biodiversidade/index.html`: artigo sobre biodiversidade.

O arquivo `style.css` localizado na raiz do projeto contém
a identidade visual compartilhada por todas as páginas.

## Tecnologias utilizadas

- HTML para a estrutura e o conteúdo.
- CSS para apresentação e responsividade.
- JavaScript para busca e filtragem dos artigos.
- Git e GitHub para controle de versão.
- Trello para organização e registro das atividades.

## Acessibilidade

Foram utilizados:

- Idioma da página definido como português do Brasil.
- Títulos organizados de forma hierárquica.
- Regiões semânticas de cabeçalho, conteúdo e rodapé.
- Textos alternativos no logotipo.
- Link para pular diretamente ao conteúdo.
- Identificação da página atual no menu.
- Links descritivos para os artigos.
- Destaque visual durante a navegação por teclado.
- Rótulo associado ao campo de busca.
- Informação dinâmica da quantidade de resultados.
- Estado selecionado dos filtros informado por `aria-pressed`.
- Botões de filtro acessíveis pelo teclado.

## Integração visual

As páginas do blog carregam dois arquivos de estilo:

1. O `style.css` principal, com cores, fontes e componentes do site.
2. O `blog/style.css`, com ajustes próprios da listagem e dos artigos.

Essa organização mantém a identidade visual do projeto e evita
a repetição desnecessária de estilos.

## Funcionalidades planejadas para versões futuras

As seguintes melhorias ainda não fazem parte da versão atual:

- Imagens próprias para os cartões dos artigos.
- Inclusão de novos conteúdos e categorias.
- Ordenação dos artigos por data ou relevância.

Essas funcionalidades deverão ser implementadas em atividades,
branches e commits separados.

## Etapas concluídas

- Planejamento inicial do blog.
- Estrutura HTML da página principal.
- Criação do modelo de artigo.
- Criação dos três artigos iniciais.
- Aplicação da identidade visual compartilhada.
- Adaptação da listagem para diferentes telas.
- Integração dos links entre a página principal e os artigos.
- Correção dos caminhos dos arquivos CSS.
- Padronização do cabeçalho e do rodapé dos artigos.
- Melhoria da leitura, das listas e dos espaçamentos.
- Implementação da busca por palavras.
- Implementação dos filtros por categoria.
- Combinação entre busca e categoria.
- Contagem dinâmica dos resultados.
- Mensagem para pesquisas sem resultados.
- Estilização responsiva dos controles.

## Verificações finais

Antes da integração na `main`, devem ser conferidos:

- Links dos três artigos.
- Link de retorno ao blog.
- Links do menu principal.
- Link para voltar ao topo.
- Apresentação em telas largas e estreitas.
- Ausência de marcadores de conflito do Git.
- Carregamento do CSS principal e do CSS do blog.
- Busca com e sem acentuação.
- Combinação entre busca e filtro.
- Estado selecionado dos botões.
- Mensagem para pesquisas sem resultados.
- Funcionamento dos controles pelo teclado.