axios.defaults.headers.common['Authorization'] = 'ufs6rqUwCkDYvURpjxAObPdf';

// pegar conteudo  mensagens 
const conteudoMensagens = []

const promessa = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')


// enviar novo de usuario
let nomeUsuario = prompt('Qual o seu nome?');

const usuario = {
    name: nomeUsuario
}

const promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', usuario)
promessa.then(enviarUsuario);
promessa.catch(enviarUsuarioErro)


function enviarUsuario (usuarioRecebido) {
console.log(usuarioRecebido)
}

function enviarUsuarioErro (usuarioErro){
console.log(usuarioErro)
if(usuarioErro.response.status === 400) {
    alert('Nome de usuário já existente')
}
}



// enviar mensagem 




function enviarMensagem () {
    let conteudoMensagem = document.querySelector('#texto').value
    console.log(conteudoMensagem)

}