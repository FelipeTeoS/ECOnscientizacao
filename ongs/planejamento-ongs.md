# Guia de páginas: ONGs que ajudam a construir um mundo melhor

## Objetivo

Apresentar em uma página única (`ongs.html`) organizações que atuam pela
conservação ambiental no Brasil. A página é organizada em **seções temáticas**;
cada seção resume a causa, lista as organizações em cartões e oferece um botão
para o canal oficial de doação ou apoio financeiro.

As organizações e os links abaixo foram consultados em outubro de 2026. Antes de
publicar, confirme os links e as formas de contribuição nos canais oficiais,
pois podem mudar.

## Estrutura da página

Arquivo único: `ongs.html`, com estilo global do site (`../style.css`) e
complementos locais em `ongs.css`.

1. **Título e chamada:** apresente a proposta em linguagem simples, com âncoras
   para as duas seções temáticas (`#florestas` e `#biodiversidade`).
2. **Seção Florestas, clima e restauração (`#florestas`):** quatro cartões de
   organizações: nome, resumo curto e botão “Conheça e apoie”.
3. **Seção Biodiversidade, fauna e biomas (`#biodiversidade`):** quatro cartões
   no mesmo formato da seção anterior.
4. **Como escolher (`#como-apoiar`):** incentiva conhecer o trabalho e a
   transparência da organização antes de doar, com passos numerados.
5. **Aviso de segurança:** orientar que doações sejam feitas somente pelos
   canais oficiais.
6. **Navegação:** menu do site para início e demais páginas.

Se a lista de organizações crescer em futuro próximo, avaliar voltar à ideia de
arquivos temáticos separados.

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
3. Conferir as opções de doação, voluntariado ou participação disponíveis.
4. Antes de contribuir, confirmar que está no site oficial da organização.

> Apoie com consciência: conheça os projetos, consulte as informações
> institucionais e confirme se está no canal oficial antes de fazer uma doação.
> Contribuir também pode significar divulgar campanhas, participar de ações ou
> se voluntariar.

## Padrão visual

- Reutilizar `style.css`, cabeçalho, logotipo, menu e rodapé do site.
- Manter os cartões com bordas arredondadas, fundos claros e paleta verde já
  usada no ECOnscientização; complementos de estilo em `ongs.css`.
- Dar destaque visual ao tema de cada seção com um selo, como “Florestas e
  clima” ou “Biodiversidade”.
- Usar links de doação com rótulos claros e acessíveis, por exemplo: “Acesse o
  canal oficial para doar”.
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
