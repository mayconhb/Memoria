// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script carregado. Página pronta.");

    // CORREÇÃO: Bloquear "Autoplay ao clicar em qualquer lugar"
    // O player Vturb adiciona um ouvinte global no 'document' para tentar iniciar o vídeo na primeira interação.
    // Ao usar stopPropagation() no body, impedimos que cliques no texto ou fundo cheguem ao document,
    // garantindo que o vídeo só inicie se o usuário clicar diretamente nele.
    document.body.addEventListener('click', function(e) {
        // e.stopPropagation() impede que o evento suba para o document/window
        // mas NÃO impede o funcionamento de links (<a href>) ou botões internos.
        e.stopPropagation();
    });
});