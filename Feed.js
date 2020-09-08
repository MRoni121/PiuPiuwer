getData();
var contador = 0;

var piar = document.querySelector('.piar');
piar.addEventListener('click', publicar);

var texto = document.querySelector('textarea');
var caracteres = document.createElement('p');
caixaDoPiu = document.querySelector('.piar');
caracteres.textContent = texto.value.length + '/140';
caixaDoPiu.appendChild(caracteres);

texto.addEventListener('input', function() {
    caracteres.textContent = texto.value.length + '/140';
});

/*publica um novo piu*/
function publicar(){
    var nome = "Mateus Roni";
    var usuario = "@mateusroni";
    var fotoDePerfil = "./Imagens/Foto.jpeg";

    if(texto.value.length > 0){
        adicionaPiu(nome, usuario, fotoDePerfil, texto.value);
        texto.value = '';
        caracteres.textContent = texto.value.length + '/140';

    }
}

/*faz o request http e chama a adicionaPiu*/
function getData() {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://next.json-generator.com/api/json/get/EkyZfHLU_');
    xhr.onload = () =>{
        const data = JSON.parse(xhr.response);
        //console.log(data);
        for(var i = data.length - 1; i >= 0; i--)
            adicionaPiu(data[i].nome, data[i].username, data[i].imagem, data[i].mensagem);
    }
    xhr.send();
}

/*adiciona piu*/
function adicionaPiu(nome, usuario, imagem, mensagem){
    var novosPius = document.querySelector('.novosPius');

    var logo = document.createElement('img');
    logo.src = "./Imagens/Logo.svg";
    logo.classList.add('logo');

    /*o modelo da estrutura está comentado no arquivo html*/

    var nomedoc = document.createElement('h3');
    var usuariodoc = document.createElement('h4');
    var imagemdoc = document.createElement('img');
    var mensagemdoc = document.createElement('p');

    nomedoc.textContent = nome;
    usuariodoc.textContent = usuario;
    imagemdoc.src = imagem;
    mensagemdoc.textContent = mensagem;

    /*parte de cima do piu*/
    var username = document.createElement('div');
    username.classList.add('username');
    username.appendChild(nomedoc);
    username.appendChild(usuariodoc);

    var user = document.createElement('div');
    user.classList.add('user');
    user.classList.add('fotoPerfil');
    user.appendChild(imagemdoc);
    user.appendChild(username);

    var topoDoPiu = document.createElement('div');
    topoDoPiu.classList.add('topoDoPiu');
    topoDoPiu.appendChild(user);
    //topoDoPiu.appendChild(logo);

    var piu1 = document.createElement('div');
    piu1.classList.add('piu1');
    piu1.appendChild(topoDoPiu);
    piu1.appendChild(mensagemdoc);


    /*parte de baixo do piu*/
    var likeImagem = document.createElement('img');
    likeImagem.src = "./Imagens/gostar.svg";

    var likeBotao = document.createElement('button');
    likeBotao.classList.add('like')
    likeBotao.appendChild(likeImagem);

    var pinImagem = document.createElement('img');
    pinImagem.src = "./Imagens/pin.svg";

    var pinBotao = document.createElement('button');
    pinBotao.classList.add('pin');
    pinBotao.appendChild(pinImagem);

    var closeImagem = document.createElement('img');
    closeImagem.src = './Imagens/close.svg';

    var closeBotao = document.createElement('button');
    closeBotao.appendChild(closeImagem);
    closeBotao.classList.add('close');

    var baseDoPiu = document.createElement('div');
    baseDoPiu.classList.add('baseDoPiu');
    baseDoPiu.appendChild(likeBotao);
    baseDoPiu.appendChild(pinBotao);
    baseDoPiu.appendChild(closeBotao);

    var piu2 = document.createElement('div');
    piu2.classList.add('piu2');
    piu2.appendChild(baseDoPiu);

    var piuCompleto = document.createElement('div');
    piuCompleto.appendChild(piu1);
    piuCompleto.appendChild(piu2);
    piuCompleto.id = contador;
    novosPius.appendChild(piuCompleto);
    //console.log(contador);
    contador++;
}

/*function apagaPiu(){
    
}
*/
