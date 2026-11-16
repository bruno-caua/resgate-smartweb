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
  document.getElementById("empresa").style.display = "none";
  document.getElementById("produtos").style.display = "none";
  document.getElementById("contato").style.display = "none";
  document.getElementById("faq").style.display = "none";
  document.getElementById(aba).style.display = "block";
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

function adiciona(i) {
  carrinho.push(produtos[i]);
  let total = 0;
  for (let j = 0; j < carrinho.length; j++) {
    total = total + carrinho[j].preco;
  }
  document.getElementById("qtd").innerHTML = carrinho.length;
  document.getElementById("total").innerHTML = "R$ " + total;
  alert("PRODUTO ADICIONADO COM SUCESSO!!!!!");
}

function limpar() {
  carrinho = [];
  document.getElementById("qtd").innerHTML = 0;
  document.getElementById("total").innerHTML = "";
}

function enviar() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  if (nome === "") {
    alert("ERRO!!!");
  }
  if (email.indexOf("@") === -1) {
    alert("ERRO NO EMAIL");
  }
  if (msg === "") alert("ERRO");
  document.getElementById("resultado").innerHTML = "Nome: " + nome + "<br>Email: " + email + "<br>Mensagem: " + msg;
}

function copiar(id) {
  document.execCommand("copy");
  alert("copiado");
}

document.addEventListener("DOMContentLoaded", montaCatalogo);
