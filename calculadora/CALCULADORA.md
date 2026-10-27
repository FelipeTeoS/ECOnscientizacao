# Calculadora ecológica

Página educacional em HTML, CSS e JavaScript, sem dependências ou serviços de cálculo externos.
Abra `calculadora.html` no navegador ou sirva a raiz do repositório com `python3 -m http.server 8080` e visite
`http://localhost:8080/calculadora/calculadora.html`. Não há instalação nem compilação.

## Escopo e unidades

O resultado soma o CO₂ fóssil da combustão direta da gasolina comum E30 e do GLP com o CO₂
associado à geração de eletricidade. Não é uma pegada de carbono completa nem um inventário
de todos os gases de efeito estufa (CO₂e). Não inclui CH₄, N₂O, cadeia de produção dos
combustíveis, fabricação do veículo, alimentos, aviação, ônibus ou resíduos.

O transporte é individual: informar somente a distância atribuída à pessoa.
Eletricidade e GLP são consumos domésticos divididos igualmente pelo número de moradores.
O mês de GLP tem 30 dias. A projeção anual multiplica o mês típico por 12: não é uma previsão
de consumo real. Zero no formulário significa zero **informado**, não impacto total zero.

## Fatores e fontes primárias

Valores fixos, escolhidos em 21/10/2026. Não são atualizados automaticamente.

| Categoria | Fator | Origem e conversão |
| --- | --- | --- |
| Gasolina comum E30 | 1,5484 kg CO₂ fóssil/L | 2,212 kg/L da gasolina A × 70% da mistura |
| Etanol anidro da E30, separado | 0,4578 kg CO₂ biogênico/L da mistura | 1,526 kg/L × 30% |
| Eletricidade SIN, referência histórica 2023 | 0,0385 kg CO₂/kWh | 0,0385 t CO₂/MWh; os fatores de 1.000 se cancelam |
| GLP | 2,98463 kg CO₂/kg | 47,3 TJ/Gg × 63.100 kg CO₂/TJ ÷ 1.000.000 kg/Gg |

- [CETESB, Emissões veiculares no Estado de São Paulo 2015](https://repositorio.cetesb.sp.gov.br/bitstreams/8d3c979c-1534-46bb-9505-5ba9b6fa8c16/download#page=195), publicado em 2016, Apêndice X, página impressa 194: fatores de gasolina A e etanol anidro.
- [MME, gasolina E30](https://www.gov.br/mme/pt-br/assuntos/secretarias/petroleo-gas-natural-e-biocombustiveis/combustivel-do-futuro/e30): gasolina comum com 30% de etanol anidro a partir de agosto de 2025. A ferramenta não se aplica à gasolina premium, etanol hidratado ou diesel.
- [MCTI, fator de emissão da geração elétrica em 2023](https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/noticias/2024/02/fator-de-emissao-de-co2-na-geracao-de-energia-eletrica-no-brasil-em-2023-e-o-menor-em-12-anos), notícia de fevereiro de 2024: média anual do SIN. É uma referência histórica fixa, não a intensidade da rede no momento do uso. Não representa sistemas elétricos isolados.
- [IPCC 2006, volume 2, capítulo 1](https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf), tabelas 1.2 e 1.4, páginas 1.18 e 1.23: poder calorífico e fator padrão de CO₂ do GLP. A composição real do GLP pode variar.

O CO₂ biogênico do etanol da mistura é calculado à parte pelo modelo e não é somado ao total
fóssil; a página não o exibe no resultado, só o explica em "Como chegamos a esses números?". Essa separação contábil **não significa** que o etanol não emita CO₂ ou tenha impacto
zero em seu ciclo de vida. Os fatores são aproximações médias e não medições de um veículo.

## Fórmulas

```text
litros de gasolina comum = distância mensal (km) / eficiência (km/L)
transporte = litros × 1,5484
energia = consumo da casa (kWh/mês) × 0,0385 / moradores
GLP = 13 kg × 30 dias / duração do botijão (dias) × 2,98463 / moradores
total mensal = transporte + energia + GLP
projeção de 12 meses = total mensal × 12
biogênico separado = litros × 0,4578
```

## Verificação

Execute `node --test tests/calculadora.test.cjs` (Node.js 18 ou superior).
Os testes usam apenas o executor nativo do Node.js e verificam valores conhecidos,
decimais, dados inválidos, rateio doméstico, atividades opcionais e resultado zero.

Arquivos: `calculadora-modelo.js` contém as fórmulas e validações; `calculadora.js`
controla a interface; `calculadora.css` complementa `../style.css` sem alterar a página inicial.

## Comparação e dicas

A referência é um resultado imutável guardado somente na memória da aba. A variação é
`novo total - total de referência`; redução é negativa, aumento é positivo. O percentual
é omitido quando a referência é zero. Limpar ou recarregar apaga a referência. Ao editar
entradas, o resultado anterior é sinalizado como desatualizado até um novo cálculo.
As dicas priorizam até duas categorias com maior contribuição positiva.

## Interface e acessibilidade

Rótulos e unidades são associados aos campos. Erros indicam o campo inválido, têm
mensagens de texto e levam o foco ao primeiro erro. O resumo recebe foco após um cálculo
válido, e alterações posteriores indicam resultado desatualizado. Os valores do gráfico
também aparecem como texto. O layout se adapta a telas pequenas e permite navegação por
teclado, com foco visível e respeito à preferência por movimento reduzido. Sem JavaScript,
um aviso explica a necessidade e o botão de cálculo permanece desativado.

A página usa apenas as fontes externas já presentes no site. Os consumos não são enviados
a serviços externos, gravados em cookies ou persistidos no armazenamento do navegador.

Verificações manuais realizadas: larguras de 320, 375 e 1440 pixels sem rolagem horizontal;
fluxo pela navegação da página inicial; erro obrigatório e moradores fracionados; foco
visível por Tab; decimal com vírgula; resultado conhecido de 23,5 kg/mês; comparação
com redução e com referência zero; aviso de dados alterados; limpeza dos dados;
abertura das fontes. Os nove testes automatizados passaram.
