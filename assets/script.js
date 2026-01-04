// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script externo carregado com sucesso.");

    // CORREÇÃO: Bloquear "Autoplay ao clicar em qualquer lugar"
    // O player Vturb adiciona um ouvinte global no 'document' para tentar iniciar o vídeo na primeira interação.
    // Ao usar stopPropagation() no body, impedimos que cliques no texto ou fundo cheguem ao document (onde o script do vídeo está escutando),
    // garantindo que o vídeo só inicie se o usuário clicar explicitamente no player.
    document.body.addEventListener('click', function(e) {
        // e.stopPropagation() impede que o evento suba para o document/window
        // mas NÃO impede o funcionamento de links (<a href>) ou botões internos.
        e.stopPropagation();
    });
});