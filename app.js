//Criando lista apara armazenas os números já sorteados.
let listaDeNumerosSorteados = [];
let numeroLimite = 30;
//Atribundo o retorno da função á variável.
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

//Função com parâmetros.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

//Função para exibir a mensagem inicial, dentro está atribuidos os parâmetros da função "exibirTextoNaTela()".
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 30');  
}

//Essa função faz com que a própria seja iniciada.
reiniciarJogo();

//Função sem parâmetro e sem retorno. Responsável por verificar o chute.
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou o número secreto com ${tentativa} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        //tentativas = tentativas + 1;
        tentativa++;
        limparCampo();
    }
}

//Função com retorno. Gera um número aleátorio.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    //Condição que erifica se o tamanho da lista já foi atingido.
    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    //Método "includes" verificar se já tem um número escolhido na lista.
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        //Recursão, esse retorno irá chamar a função novamente. Então será gerado um novo número caso o número já estiver na lista.
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

//Função que limpar o campo de valor.
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Função que reinicia o jogo após o usuário acertar o número secreto.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativa = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}