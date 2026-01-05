(function() {
    // Garante que o contador funcione independentemente de arquivos externos
    var viewerDisplay = document.getElementById('viewer-count');
    
    if (viewerDisplay) {
        var min = 913;
        var max = 957;
        
        // Define valor inicial aleatório
        var current = Math.floor(Math.random() * (max - min + 1)) + min;
        viewerDisplay.textContent = current;

        function updateCount() {
            // Variação natural (-3 a +3)
            var change = Math.floor(Math.random() * 7) - 3;
            current += change;

            // Manter limites (Clamping)
            if (current < min) current = min + Math.floor(Math.random() * 3);
            if (current > max) current = max - Math.floor(Math.random() * 3);

            viewerDisplay.textContent = current;
            
            // Tempo aleatório entre updates (1s a 3s)
            setTimeout(updateCount, Math.floor(Math.random() * 2000) + 1000);
        }
        
        // Inicia loop imediatamente
        updateCount();
    }

    // Prevenir cliques indesejados no body (para não pausar o player)
    if (document.body) {
        document.body.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Carregamento do Player de Vídeo
    var s = document.createElement("script");
    s.src = "https://scripts.converteai.net/8be91a4f-8063-443e-ad7c-0bc55451c92d/players/6959b2bbc9de5690088a914b/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    // Lógica para mostrar o botão após 10 segundos de reprodução real
    var playTime = 0;
    var isPlaying = false;
    var timerInterval = null;
    var targetTime = 10; // Segundos
    var container = document.getElementById('checkout-container');

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(function() {
                if (isPlaying) {
                    playTime++;
                    if (playTime >= targetTime) {
                        if (container) container.classList.remove('hidden');
                        clearInterval(timerInterval);
                    }
                }
            }, 1000);
        }
    }

    // Integração com a API do Vturb (SmartPlayer)
    window.addEventListener('message', function(event) {
        // Log para debug no console do navegador (pode ser removido depois)
        console.log('Vturb Message Received:', event.data);

        var msg = '';
        if (typeof event.data === 'string') {
            try {
                var data = JSON.parse(event.data);
                msg = data.event || data.msg || data.payload || '';
            } catch(e) {
                msg = event.data;
            }
        } else if (event.data) {
            msg = event.data.event || event.data.msg || event.data.payload || event.data.type || '';
        }

        console.log('Parsed message:', msg);

        if (msg === 'play' || msg === 'vturb_play' || msg === 'playing' || msg.indexOf('play') !== -1) {
            console.log('Video Play Detected');
            isPlaying = true;
            startTimer();
        } else if (msg === 'pause' || msg === 'vturb_pause' || msg === 'paused' || msg.indexOf('pause') !== -1) {
            console.log('Video Pause Detected');
            isPlaying = false;
        }
    });

    // Monitoramento via Pooling (Fallback Supremo)
    // Se a API de mensagens falhar, verificamos o estado do elemento vturb-smartplayer
    setInterval(function() {
        var player = document.querySelector('vturb-smartplayer');
        if (player) {
            // Alguns players expõem o estado via atributos ou propriedades
            // Verificamos se o tempo de vídeo no player está avançando
            if (typeof player.getCurrentTime === 'function') {
                var currentTime = player.getCurrentTime();
                if (window.lastVideoTime !== undefined && currentTime > window.lastVideoTime) {
                    if (!isPlaying) {
                        console.log('Movement detected via API - Starting timer');
                        isPlaying = true;
                        startTimer();
                    }
                } else if (window.lastVideoTime !== undefined && currentTime === window.lastVideoTime) {
                    // isPlaying = false; // Não pausamos aqui para evitar falso positivo em buffer
                }
                window.lastVideoTime = currentTime;
            }
        }
    }, 1000);

    // SmartPlayer API listener alternativo
    window._vturb_api = window._vturb_api || [];
    window._vturb_api.push(function(player) {
        player.on('play', function() {
            console.log('API: Play');
            isPlaying = true;
            startTimer();
        });
        player.on('pause', function() {
            console.log('API: Pause');
            isPlaying = false;
        });
    });

    // Fallback: Tentar capturar eventos via custom events se o postMessage falhar
    document.addEventListener('vturb_play', function() {
        isPlaying = true;
        startTimer();
    });
    document.addEventListener('vturb_pause', function() {
        isPlaying = false;
    });

})();