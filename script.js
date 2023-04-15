axios.defaults.headers.common["Authorization"] = "ufs6rqUwCkDYvURpjxAObPdf";

// pegar conteudo  mensagens
const conteudoMensagens = [];

setInterval(mensagensReload,3000);

function mensagensReload() {
  const mensagem = axios.get(
    "https://mock-api.driven.com.br/api/vm/uol/messages"
  );
  mensagem.then(receberMensagens);
  mensagem.catch(erroMensagens);
  
}

function receberMensagens(mensagensRecebidas) {
  const recebMensagens = document.querySelector(".boxMensagens");
  recebMensagens.innerHTML = "";

  let mensagens = mensagensRecebidas.data;

  for (let i = 0; i < mensagens.length; i++) {
    let msg = mensagens[i];

    if (msg.type === "status") {
      let mens = document.createElement("li");
      mens.className = "mensagem status";
      mens.setAttribute("data-test", "message")
      mens.innerHTML = `<span>(${msg.time}) </span><strong>${msg.from} </strong> ${msg.text}`;
      recebMensagens.appendChild(mens);
    } else {
      let mens = document.createElement("li");
      mens.className = "mensagem";
      mens.setAttribute("data-test", "message")
      mens.innerHTML = `<span>(${msg.time}) </span><strong>${msg.from}</strong> para <strong>${msg.to}</strong>: ${msg.text}`;
      recebMensagens.appendChild(mens);
    }
  }
}

function erroMensagens(mensagensErr) {
  alert("Erro ao receber mensagens!");
}

function statusUsuario() {
  const status = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/status",usuario);
    console.log(status)
}

// enviar novo de usuario
let nomeUsuario = prompt("Qual o seu nome?");
let usuario = {
  name: nomeUsuario,
};

postarUsuario(usuario);

setInterval(statusUsuario, 5000);

function postarUsuario(user) {
  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/participants",user);
  promessa.then(enviarUsuario);
  promessa.catch(enviarUsuarioErro);
}

function enviarUsuario(usuarioRecebido) {
  alert("Vamos tc?");
}

function enviarUsuarioErro(usuarioErro) {
  if (usuarioErro.response.status === 400) {
    alert("Nome de usuário já existente");
    nomeUsuario = prompt("Novamente o seu nome?");

    usuario = {
      name: nomeUsuario,
    };
    postarUsuario(usuario);
  }
}

// enviar mensagem

function enviarMensagem() {
  let conteudoMensagem = document.querySelector("#texto").value;

  let hoje = new Date();
  let hora = hoje.getHours().toString().padStart(2, "0");
  let minutos = hoje.getMinutes().toString().padStart(2, "0");
  let segundos = hoje.getSeconds().toString().padStart(2, "0");
  let horario = `${hora}:${minutos}:${segundos}`;

  let mensagem = {
    from: nomeUsuario,
    to: "Todos",
    text: conteudoMensagem,
    type: "message",
    time: horario,
  };

  let mens = axios.post(
    "https://mock-api.driven.com.br/api/vm/uol/messages",mensagem);
  mens.then(mensagemEnviada);
  mens.catch(erroAoEnviar);
  console.log(mens)

  document.querySelector("#texto").value = "";
}


function mensagemEnviada(deuCerto) {
    console.log('deu certo')
    mensagensReload();
    
}

function erroAoEnviar(errou) {
    window.location.reload();
    console.log('deu errado')
}
