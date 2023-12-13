let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = geraNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMessagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}
exibirMessagemInicial();


function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return geraNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}


function verificarChute(){
    let chute = document.querySelector('input').value; 
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Voce acertou');
        let palavraTentativa =  tentativa > 1 ? ' tentativas' : ' tentativa';
        let messagemTentativa = (`Voce descobriu o numero secreto com ${tentativa} ${palavraTentativa}!`);
        exibirTextoNaTela('p', messagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O numero secreto e menor');
        }else{
            exibirTextoNaTela('p', 'O numero secreto e maior');
        }
        tentativa++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMessagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}