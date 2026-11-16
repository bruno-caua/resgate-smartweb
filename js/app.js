/*
 * Projeto: Resgate da SmartWeb — Desenvolvimento Web I
 * Arquivo: js/app.js
 * Responsável JS: Willian Lira de Souza
 */

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

let carrinho = [];
let linhaAtual = "todas";
let termoBusca = "";

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostraAba(aba) {
  const abas = ["empresa", "produtos", "contato", "faq"];
  abas.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === aba ? "block" : "none";
  });
}

function montaCatalogo() {
  const container = document.getElementById("catalogo");
  const elResultadoBusca = document.getElementById("resultadoBusca");
  if (!container) return;

  const termoNormalizado = termoBusca.trim().toLowerCase();

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
      ? `Você buscou por: "${termoBusca.trim()}" (${filtrados.length} resultado(s))`
      : "";
  }

  container.innerHTML = "";

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
  linhaAtual = l;
  montaCatalogo();
}

function busca() {
  const inputBusca = document.getElementById("busca");
  termoBusca = inputBusca ? inputBusca.value : "";
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
  const item = produtos[i];
  if (!item) return;
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

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const assunto = campoAssunto ? campoAssunto.value : "";
  const msg = campoMsg.value.trim();

  let valido = true;

  if (nome === "") {
    erroNome.textContent = "Informe seu nome.";
    campoNome.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroNome.textContent = "";
    campoNome.removeAttribute("aria-invalid");
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    erroEmail.textContent = "Informe um e-mail válido com @.";
    campoEmail.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroEmail.textContent = "";
    campoEmail.removeAttribute("aria-invalid");
  }

  if (msg === "") {
    erroMsg.textContent = "Escreva sua mensagem.";
    campoMsg.setAttribute("aria-invalid", "true");
    valido = false;
  } else {
    erroMsg.textContent = "";
    campoMsg.removeAttribute("aria-invalid");
  }

  const resultado = document.getElementById("resultado");
  if (!resultado) return;
  resultado.innerHTML = "";

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

  resultado.append(titulo, pNome, pEmail, pAssunto, pMsg);
}

async function copiar(id) {
  const spansContato = document.querySelectorAll("#contato span[id]");
  if (spansContato.length >= 2 && spansContato[1].id === "c-wa") {
    spansContato[1].id = "c-tel";
  }

  const alvo = document.getElementById(id);
  if (!alvo) return;

  const texto = alvo.textContent.trim();
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

document.addEventListener("DOMContentLoaded", () => {
  montaCatalogo();
  atualizaResumoPedido();
  inicializarFaqAcessivel();

  const formContato = document.querySelector("#contato form");
  if (formContato) {
    formContato.setAttribute("novalidate", "");
    formContato.addEventListener("submit", enviar);
  }
});
