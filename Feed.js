getData();

var piar = document.querySelector('.piar');
piar.addEventListener('click', publicar);

var texto = document.querySelector('textarea');
var caracteres = document.querySelector('.caracteres');
caixaDoPiu = document.querySelector('.piar');
caracteres.textContent = texto.value.length + '/140';

textoAviso = document.querySelector('.textoPiu');
texto.addEventListener('input', mudaCorTexto);



/*muda a cor do texto*/
function mudaCorTexto(){
    caracteres.textContent = texto.value.length + '/140';
    if (texto.value.length <= 140){
        if(textoAviso.classList.contains('transparente') == false){
            textoAviso.classList.add('transparente');
        }
    }

    if(texto.value.length <= 40){
        if(caracteres.classList.contains('amarelo') == true){
            caracteres.classList.remove('amarelo');
        }
        else if(caracteres.classList.contains('laranja') == true){
            caracteres.classList.remove('laranja');
        }
        else if(caracteres.classList.contains('vermelho')){
            caracteres.classList.remove('vermelho');
        }
    }

    
    else if(texto.value.length <= 80){
        caracteres.classList.add('amarelo');
        if(caracteres.classList.contains('laranja') == true){
            caracteres.classList.remove('laranja');
        }
        else if(caracteres.classList.contains('vermelho')){
            caracteres.classList.remove('vermelho');
        }
    }


    else if(texto.value.length <= 140){
        caracteres.classList.add('laranja');
        if(caracteres.classList.contains('amarelo') == true){
            caracteres.classList.remove('amarelo');
        }
        else if(caracteres.classList.contains('vermelho')){
            caracteres.classList.remove('vermelho');
        }
    }


    else{
        caracteres.classList.remove('laranja');
        caracteres.classList.add('vermelho');
        if(textoAviso.classList.contains('transparente')){
            textoAviso.classList.remove('transparente');
        }


    }
     
}

/*publica um novo piu*/
function publicar(){
    var nome = "Mateus Roni";
    var usuario = "@mateusroni";
    var fotoDePerfil = "./Imagens/Foto.jpeg";

    if(texto.value.length > 0 && texto.value.length <=140){
        adicionaPiu(nome, usuario, fotoDePerfil, texto.value, 'antes');
        texto.value = '';
        caracteres.textContent = texto.value.length + '/140';
    }
    mudaCorTexto();
}

/*faz o request http e chama a adicionaPiu*/
function getData() {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://next.json-generator.com/api/json/get/EkyZfHLU_');
    xhr.onload = () =>{
        const data = JSON.parse(xhr.response);
        //console.log(data);
        for(var i = 0; i < data.length; i++)
            adicionaPiu(data[i].nome, data[i].username, data[i].imagem, data[i].mensagem, 'depois');
    }
    xhr.send();
}

/*adiciona piu*/
function adicionaPiu(nome, usuario, imagem, mensagem, posicao){
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
    likeImagem.classList.add('semCor');

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

    var fixados = document.querySelector('.fixados');

    if(posicao == 'depois'){
        novosPius.appendChild(piuCompleto);
    }
    else if (posicao == 'antes'){
        novosPius.prepend(piuCompleto);
    }

    /*dá like*/
    likeBotao.addEventListener('click', function(){
        if(likeImagem.classList.contains('semCor')){
            likeImagem.classList.add('fundoVermelho');
            likeImagem.classList.remove('semCor');
        }

        else{
        likeImagem.classList.add('semCor');
        likeImagem.classList.remove('fundoVermelho');
        }
    })

    /*fixa um piu, mas o piu desfixado não funciona mais*/
    var novoPiuCompleto = piuCompleto.cloneNode(true);
    pinBotao.addEventListener('click', function() {
        if(piuCompleto.parentNode.className == 'novosPius'){
            novosPius.insertBefore(novoPiuCompleto, piuCompleto);
            document.querySelector('.fixados').prepend(piuCompleto);
            novoPiuCompleto.classList.add('escondido');
            pinImagem.classList.add('fundoVermelho');
        }
        else{
            a = this.parentNode.parentNode.parentNode;
            fixados.removeChild(a);
            novoPiuCompleto.classList.remove('escondido');
        }

    })

    /*remove*/
    closeBotao.addEventListener('click', function(){
        this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
    })


}
