Diagnóstico HTML (Pessoa 1 - Bruno Cauã)

Realizei uma análise do codigo HTML original do projeto SmartWeb, com foco em achar possíveis problemas relacionado a estruturação do documento, utilização de elementos HTML, à semântica e a organização dos formularios.

E durante essa análise, identifiquei alguns aspectos que podem comprometer a organização e o funcionamento adequado da página.

Registrei os sintomas observados para depois investigar as causas e realizar as correções, documentando cada alteração com seu respectivo commit no Diário de Bordo.


| Nº | Data | Sintoma observado | Causa encontrada | Seção da apostila | O que foi feito | Commit | Responsável |

Nº: 01
 
Data: 13/11/2026
 
Sintoma Observado: O documento não apresenta a estrutura inicial completa exigida pelo HTML5. O título da página é genérico.

Causa Encontrada: Ausência de DOCTYPE, atributo lang e metadados de codificação e viewport. O título foi definido apenas como "site".

Seção da Apostila: Unidade 2 - seção 2.1: Estrutura fundamental de um documento HTML5.

O que foi feito: adicionei a declaração HTML5, idioma, metadados e título adequado.

Commit: fix(html): adiciona estrutura inicial HTML5

Responsável: Bruno Cauã

Nº: 02

Data: 13/11/2026

Sintoma Observado: A estrutura da página utiliza elementos genéricos e tabelas para organizar o layout. A hierarquia dos títulos apresenta inconsistências.

Causa Encontrada: Uso inadequado de divs como regiões principais, tabelas para apresentação visual e níveis de títulos sem organização semântica.

Seção da Apostila: Unidade 2 — seções 2.2, 2.5 e 2.6; Unidade 3 — seção 3.6.

O que foi feito: Organizei as regiões semânticas, revisei os títulos e substitui tabelas de layout por elementos apropriados.

Commit: refactor(html): melhora estrutura semântica da página

Responsável: Bruno Cauã

Nº: 03

Data: 14/11/2026

Sintoma Observado: O código apresentava elementos e atributos de apresentação obsoletos, como font, marquee, center e bgcolor, além do uso de document.write() no rodapé.

Causa Encontrada: Utilização de elementos antigos de formatação e atributos visuais diretamente no HTML, além do uso de document.write() para inserir conteúdo na página.

Seção da Apostila: Unidade 2 — HTML5 e elementos semânticos; Unidade 6 e 8 — Boas práticas de JavaScript.

O que foi feito: Removi o elemento marquee, substituí os elementos font por span e p com classes apropriadas, removi o center do rodapé e o atributo bgcolor do body. Também substituí os elementos font utilizados na geração dinâmica dos produtos por span e removi o uso de document.write() do rodapé.

Commit: refactor(html): remover elementos e atributos obsoletos

Responsável: Bruno Cauã

Nº: 04

Data: 14/11/2026

Sintoma Observado: Os campos do formulário não apresentavam rótulos associados, e o campo de e-mail estava configurado como texto comum, sem indicação de obrigatoriedade dos campos.

Causa Encontrada: Ausência de elementos label associados aos controles, utilização de type="text" no campo de e-mail e ausência dos atributos name e required nos campos necessários.

Seção da Apostila: Unidade 2 — seção 2.3 (Formulários).

O que foi feito: Associei elementos label aos campos do formulário utilizando os atributos for e id, alterei o tipo do campo de e-mail para email, acrescentei os atributos name e required aos campos necessários e o atributo autocomplete para facilitar o preenchimento. Também testei a associação dos rótulos, verificando que os campos recebiam foco ao clicar neles.

Commit: fix(html): melhorar estrutura do formulario

Responsável: Bruno Cauã

Correção A5

Nº: 05
Data: 14/11/2026

Sintoma Observado: As imagens da página não possuíam descrições alternativas. Na área de contato, WhatsApp e telefone utilizavam o mesmo identificador (id="c-wa"). O botão de copiar telefone apontava para c-tel, que não existia no elemento correspondente.

Causa Encontrada: Ausência do atributo alt nas imagens e utilização de um identificador duplicado no HTML, causando inconsistência entre o elemento do telefone e a referência utilizada pelo botão de cópia.

Seção da Apostila: Unidade 2 — seção 2.4 (imagens e atributo alt); Etapa 3 — identificadores utilizados pelo JavaScript; Etapa 4 — passo 6 (formulário e imagens).

O que foi feito: Adicionei o atributo alt à imagem do logotipo e à imagem do switch. Também acrescentei descrições alternativas às imagens dos produtos geradas dinamicamente pelo JavaScript, utilizando o nome de cada produto. Na área de contato, alterei o identificador do telefone de c-wa para c-tel, mantendo a correspondência com o botão de copiar.

Commit: fix: melhora acessibilidade das imagens e corrige id do telefone

Responsável: Bruno Cauã

## Evolução JavaScript, Segurança, CSS3 Responsivo e Integração (Willian Lira de Souza)

| Nº | Data | Sintoma observado | Causa encontrada | Seção da apostila | O que foi feito | Commit | Responsável |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 06 | 15/11 | Erro de sintaxe e runtime no carregamento do catálogo (`innerHtml`, `linhaAtual == l`, `i <= produtos.length`, `id="produto"`) | Script inline com erros de digitação, comparação em vez de atribuição, loop estourando índice do array e ID incorreto da seção | Seções 6.1, 6.2 e 11.2 | Extraído script para `js/app.js` com `defer` e `DOMContentLoaded`, corrigido loop e referências de ID com Console limpo | `d72063c` | Willian Lira |
| 07 | 15/11 | Busca ignora termos no início, diferencia maiúsculas, não combina com filtro de linha e preços não têm formatação em reais | Uso de `indexOf(termo) > 0` sem `.toLowerCase()`, sobrescrita de `#catalogo` e ausência de `toLocaleString` | Seções 6.2, 6.7 e 11.4 | Filtragem combinada por linha e termo (nome, descrição e SKU) case-insensitive e formatação BRL (`R$ 0.000,00`) | `c60f2f4` | Willian Lira |
| 08 | 15/11 | Pedido usa `alert` bloqueante, formulário recarrega a página, botão copiar falha no telefone e FAQ não funciona por teclado | Uso de `alert()`, ausência de `preventDefault()`, IDs duplicados e interação dependente de `onmouseover` | Seções 5.3, 5.4, 6.5 e 8.3 | Removidos `alert()`, adicionada validação inline ao lado dos campos com `aria-live`, Clipboard API e FAQ acessível | `a5bd710` | Willian Lira |
| 09 | 15/11 | Risco de XSS por injeção de HTML na busca/formulário e ausência do recurso extra de segurança da equipe `associados` | Entradas refletidas sem sanitização ou limite de tamanho e falta de allowlists para navegação/filtros | Seção 11.4 e Ficha da Equipe | Sanitização anti-XSS (`textContent` + `replaceChildren`), allowlists, `Object.freeze()` no carrinho e identificação da equipe `associados` | `c4131c3` | Willian Lira |
| 10 | 17/11 | CSS e JS ainda estavam embutidos no HTML, havia `<br>` para espaçamento, `float`, larguras fixas, baixo contraste e menu oculto abaixo de 1200px | `<style>` inline com `!important`, layout rígido e `@media (max-width: 1200px) { #menu { display: none; } }` | Seções 3, 4, 7 e 8 | Extraído CSS para `css/estilos.css` com Grid/Flexbox responsivo (360px, 768px, 1280px e Zoom 200%), contraste WCAG AA, foco visível e integração sem atributos inline | `3e5ce79` | Willian Lira |
