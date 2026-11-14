Diagnóstico HTML (Pessoa 1 - Bruno Cauã)

Realizei uma análise do codigo HTML original do projeto SmartWeb, com foco em achar possíveis problemas relacionado a estruturação do documento, utilização de elementos HTML, à semântica e a organização dos formularios.

E durante essa análise, identifiquei alguns aspectos que podem comprometer a organização e o funcionamento adequado da página.

Registrei os sintomas observados para depois investigar as causas e realizar as correções, documentando cada alteração com seu respectivo commit no Diário de Bordo.


| Nº | Data | Sintoma observado | Causa encontrada | Seção da apostila | O que foi feito | Commit | Responsável |

Nº: 01 
Data: 13/11/2026 
Sintoma Observado: O documento não apresenta a estrutura inicial completa exigida pelo HTML5. O título da página é genérico.Causa Encontrada: Ausência de DOCTYPE, atributo lang e metadados de codificação e viewport. O título foi definido apenas como "site".
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