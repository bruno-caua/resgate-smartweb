/*
 * Projeto: Resgate da SmartWeb — Desenvolvimento Web I
 * Equipe: associados | Recurso Extra: Segurança
 * Arquivo: js/app.js
 * Responsável JS: Willian Lira de Souza
 */

const EQUIPE_CODIGO = "associados";
const RECURSO_EXTRA = "seguranca";

const produtos = [
  { nome: 'Notebook Pro 14", i5, 16 GB, SSD 512 GB', sku: "NB-PRO14", linha: "comp", preco: 4290, desc: "Tela Full HD, teclado com numérico reduzido e bateria para o dia todo." },
  { nome: "Desktop Office, i5, 8 GB, SSD 256 GB", sku: "DT-OFFICE", linha: "comp", preco: 2890, desc: "Torre compacta para caixa e atendimento, com Windows 11 Pro." },
  { nome: "Mini PC Compacto, Ryzen 5, 16 GB", sku: "MP-R5", linha: "comp", preco: 2390, desc: "Cabe atrás do monitor e gasta pouca energia. Ideal para recepção." },
  { nome: 'Monitor 24" Full HD IPS', sku: "MN-24IPS", linha: "comp", preco: 849, desc: "Ângulo de visão aberto, entradas HDMI e DisplayPort, base ajustável." },
  { nome: "Switch gerenciável Gigabit, 24 portas", sku: "SW-GER24", linha: "rede", preco: 1690, desc: "VLANs, controle de banda e portas sobrando para a empresa crescer." },
  { nome: "Access Point Wi-Fi 6 de teto", sku: "AP-W6T", linha: "rede", preco: 780, desc: "Rede separada para visitantes e alimentação pelo cabo de rede (PoE)." },
  { nome: "Roteador dual WAN com VLAN", sku: "RT-DWAN", linha: "rede", preco: 620, desc: "Dois links de internet com troca automática se um cair." },
  { nome: "Cabo CAT6, caixa com 305 m", sku: "CB-CAT6-305", linha: "rede", preco: 690, desc: "Par trançado para pontos de rede Gigabit, com capa antichama." },
  { nome: "NAS de 2 baias", sku: "NAS-2B", linha: "prot", preco: 2190, desc: "Compartilha arquivos e faz backup automático. Discos vendidos à parte." },
  { nome: "Nobreak senoidal 1500 VA", sku: "UPS-1500S", linha: "prot", preco: 2450, desc: "Energia limpa para servidor e switch, com proteção contra queima." },
  { nome: "SSD NVMe 1 TB", sku: "SSD-NV1T", linha: "prot", preco: 520, desc: "Troca o disco antigo e deixa o computador bem mais rápido." },
  { nome: "HD externo 2 TB, USB 3.0", sku: "HD-EXT2T", linha: "prot", preco: 489, desc: "Segunda mídia local para a cópia de segurança diária." }
];

const LINHAS_PERMITIDAS = new Set(["todas", "comp", "rede", "prot"]);
const ABAS_PERMITIDAS = new Set(["empresa", "produtos", "contato", "faq"]);

let carrinho = [];
let linhaAtual = "todas";
let termoBusca = "";

function sanitizarTexto(valor, limite = 200) {
  return String(valor ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, limite);
}

function formatarMoeda(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < 0) return "R$ 0,00";
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostraAba(aba) {
  if (!ABAS_PERMITIDAS.has(aba)) return;
  ABAS_PERMITIDAS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === aba ? "block" : "none";
  });
}

function montaCatalogo() {
  const container = document.getElementById("catalogo");
  const elResultadoBusca = document.getElementById("resultadoBusca");
  if (!container) return;

  const termoSeguro = sanitizarTexto(termoBusca, 80);
  const termoNormalizado = termoSeguro.toLowerCase();

  const filtrados = produtos.filter((produto) => {
    const correspondeLinha = linhaAtual === "todas" || produto.linha === linhaAtual;
    const correspondeBusca =
      termoNormalizado === "" ||
      produto.nome.toLowerCase().includes(termoNormalizado) ||
      produto.desc.toLowerCase().includes(termoNormalizado) ||
      produto.sku.toLowerCase().includes(termoNormalizado);

    return correspondeLinha && correspondeBusca;
  });

  if (elResultadoBusca) {
    elResultadoBusca.textContent = termoNormalizado !== ""
      ? `Você buscou por: "${termoSeguro}" (${filtrados.length} resultado(s))`
      : "";
  }

  container.replaceChildren();

  if (filtrados.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhum produto encontrado para a busca ou filtro selecionado.";
    container.appendChild(aviso);
    return;
  }

  filtrados.forEach((produto) => {
    const indiceOriginal = produtos.indexOf(produto);

    const card = document.createElement("div");
    card.className = "card";
    card.style.cssText = "float:left;width:240px;height:330px;margin:5px;border:1px solid #eee";

    const img = document.createElement("img");
    img.src = `produto${indiceOriginal}.png`;
    img.alt = produto.nome;
    img.width = 120;

    const sku = document.createElement("small");
    sku.textContent = produto.sku;

    const titulo = document.createElement("h4");
    titulo.textContent = produto.nome;

    const desc = document.createElement("p");
    desc.textContent = produto.desc;

    const preco = document.createElement("strong");
    preco.textContent = formatarMoeda(produto.preco);

    const btnAdicionar = document.createElement("button");
    btnAdicionar.type = "button";
    btnAdicionar.className = "botao";
    btnAdicionar.textContent = "Adicionar ao pedido";
    btnAdicionar.addEventListener("click", () => adiciona(indiceOriginal));

    card.append(img, document.createElement("br"), sku, titulo, desc, preco, document.createElement("br"), btnAdicionar);
    container.appendChild(card);
  });
}

function filtra(l) {
  if (!LINHAS_PERMITIDAS.has(l)) return;
  linhaAtual = l;
  montaCatalogo();
}

function busca() {
  const inputBusca = document.getElementById("busca");
  termoBusca = inputBusca ? sanitizarTexto(inputBusca.value, 80) : "";
  montaCatalogo();
}

function atualizaResumoPedido(mensagemStatus = "") {
  const total = carrinho.reduce((soma, item) => soma + Number(item.preco), 0);
  const elQtd = document.getElementById("qtd");
  const elTotal = document.getElementById("total");

  if (elQtd) elQtd.textContent = String(carrinho.length);
  if (elTotal) elTotal.textContent = formatarMoeda(total);

  let elAviso = document.getElementById("aviso-pedido");
  const boxPedido = document.getElementById("pedido");
  if (!elAviso && boxPedido) {
    elAviso = document.createElement("p");
    elAviso.id = "aviso-pedido";
    elAviso.setAttribute("aria-live", "polite");
    boxPedido.appendChild(elAviso);
  }
  if (elAviso) elAviso.textContent = mensagemStatus;
}

function adiciona(i) {
  if (!Number.isInteger(i) || i < 0 || i >= produtos.length) return;
  const item = Object.freeze({ ...produtos[i] });
  carrinho.push(item);
  atualizaResumoPedido(`"${item.nome}" adicionado ao pedido (${carrinho.length} item(ns)).`);
}

function limpar() {
  carrinho = [];
  atualizaResumoPedido("Pedido limpo.");
}

function obterOuCriarSpanErro(campo) {
  const idErro = `erro-${campo.id}`;
  let span = document.getElementById(idErro);
  if (!span) {
    span = document.createElement("span");
    span.id = idErro;
    span.className = "erro-campo";
    span.setAttribute("aria-live", "polite");
    span.style.marginLeft = "8px";
    span.style.color = "#b00020";
    campo.insertAdjacentElement("afterend", span);
  }
  return span;
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 120;
}

function enviar(evento) {
  if (evento && typeof evento.preventDefault === "function") {
    evento.preventDefault();
  }

  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoAssunto = document.getElementById("assunto");
  const campoMsg = document.getElementById("msg");

  const erroNome = obterOuCriarSpanErro(campoNome);
  const erroEmail = obterOuCriarSpanErro(campoEmail);
  const erroMsg = obterOuCriarSpanErro(campoMsg);

  const nome = sanitizarTexto(campoNome.value, 100);
  const email = sanitizarTexto(campoEmail.value, 120);
  const assunto = campoAssunto ? sanitizarTexto(campoAssunto.value, 60) : "";
  const msg = sanitizarTexto(campoMsg.value, 1000);

  let valido = true;

  if (nome.length < 2) {
    erroNome.textContent = "Informe seu nome completo (mínimo 2 caracteres).";
    campoNome.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroNome.textContent = "";
    campoNome.removeAttribute("aria-invalid");
  }

  if (!emailValido(email)) {
    erroEmail.textContent = "Informe um e-mail válido (ex.: nome@empresa.com.br).";
    campoEmail.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroEmail.textContent = "";
    campoEmail.removeAttribute("aria-invalid");
  }

  if (msg.length < 5) {
    erroMsg.textContent = "Escreva sua mensagem (mínimo 5 caracteres).";
    campoMsg.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroMsg.textContent = "";
    campoMsg.removeAttribute("aria-invalid");
  }

  const resultado = document.getElementById("resultado");
  if (!resultado) return;
  resultado.replaceChildren();

  if (!valido) return;

  const titulo = document.createElement("strong");
  titulo.textContent = "Mensagem montada com sucesso:";

  const pNome = document.createElement("p");
  pNome.textContent = `Nome: ${nome}`;

  const pEmail = document.createElement("p");
  pEmail.textContent = `E-mail: ${email}`;

  const pAssunto = document.createElement("p");
  pAssunto.textContent = `Assunto: ${assunto}`;

  const pMsg = document.createElement("p");
  pMsg.textContent = `Mensagem: ${msg}`;

  if (carrinho.length > 0) {
    const totalPedido = carrinho.reduce((soma, item) => soma + item.preco, 0);
    const pItens = document.createElement("p");
    pItens.textContent = `Itens do pedido (${carrinho.length}): ${carrinho.map((item) => item.sku).join(", ")} — Total: ${formatarMoeda(totalPedido)}`;
    resultado.append(titulo, pNome, pEmail, pAssunto, pMsg, pItens);
  } else {
    resultado.append(titulo, pNome, pEmail, pAssunto, pMsg);
  }
}

async function copiar(id) {
  const spansContato = document.querySelectorAll("#contato span[id]");
  if (spansContato.length >= 2 && spansContato[1].id === "c-wa") {
    spansContato[1].id = "c-tel";
  }

  const alvo = document.getElementById(id);
  if (!alvo) return;

  const texto = sanitizarTexto(alvo.textContent, 120);
  try {
    await navigator.clipboard.writeText(texto);
  } catch {
    const areaTemp = document.createElement("textarea");
    areaTemp.value = texto;
    document.body.appendChild(areaTemp);
    areaTemp.select();
    document.execCommand("copy");
    areaTemp.remove();
  }

  let avisoCopia = document.getElementById("aviso-copia");
  if (!avisoCopia) {
    avisoCopia = document.createElement("p");
    avisoCopia.id = "aviso-copia";
    avisoCopia.setAttribute("aria-live", "polite");
    alvo.closest("td")?.appendChild(avisoCopia);
  }
  avisoCopia.textContent = `Copiado: ${texto}`;
}

function inicializarFaqAcessivel() {
  const perguntas = document.querySelectorAll("#faq h6, #faq .faq-pergunta");
  perguntas.forEach((pergunta) => {
    const resposta = pergunta.nextElementSibling;
    if (!resposta) return;

    pergunta.removeAttribute("onmouseover");
    pergunta.removeAttribute("onmouseout");
    pergunta.setAttribute("tabindex", "0");
    pergunta.setAttribute("role", "button");
    pergunta.setAttribute("aria-expanded", "false");
    pergunta.style.cursor = "pointer";
    resposta.style.display = "none";

    const alternar = () => {
      const aberta = pergunta.getAttribute("aria-expanded") === "true";
      pergunta.setAttribute("aria-expanded", String(!aberta));
      resposta.style.display = aberta ? "none" : "block";
    };

    pergunta.addEventListener("click", alternar);
    pergunta.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        alternar();
      }
    });
  });
}

function aplicarIdentificacaoEquipeSeguranca() {
  document.documentElement.dataset.equipe = EQUIPE_CODIGO;
  document.documentElement.dataset.recurso = RECURSO_EXTRA;

  const linksExternos = document.querySelectorAll('a[target="_blank"]');
  linksExternos.forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  const rodape = document.querySelector(".rodape, footer");
  if (rodape && !document.getElementById("identificacao-equipe")) {
    const info = document.createElement("p");
    info.id = "identificacao-equipe";
    info.textContent = `Equipe: ${EQUIPE_CODIGO} | Recurso: Segurança (Prevenção XSS e Sanitização)`;
    rodape.appendChild(info);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  montaCatalogo();
  atualizaResumoPedido();
  inicializarFaqAcessivel();
  aplicarIdentificacaoEquipeSeguranca();

  const formContato = document.querySelector("#contato form");
  if (formContato) {
    formContato.setAttribute("novalidate", "");
    formContato.addEventListener("submit", enviar);
  }
});
