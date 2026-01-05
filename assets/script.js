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
                        timerInterval = null;
                    }
                }
            }, 1000);
        }
    }

    // Integração com a API do Vturb (SmartPlayer)
    window.addEventListener('message', function(event) {
        var msg = '';
        if (event.data && typeof event.data === 'object') {
            msg = event.data.type || event.data.event || event.data.msg || event.data.payload || '';
        } else if (typeof event.data === 'string') {
            try {
                var data = JSON.parse(event.data);
                msg = data.type || data.event || data.msg || data.payload || '';
            } catch(e) {
                msg = event.data;
            }
        }

        var isPlayEvent = msg === 'play' || msg === 'playing' || msg === 'vturb_play' || msg === 'VIDEO_PLAY';
        var isPauseEvent = msg === 'pause' || msg === 'paused' || msg === 'vturb_pause' || msg === 'VIDEO_PAUSE';

        if (isPlayEvent) {
            isPlaying = true;
            startTimer();
        } else if (isPauseEvent) {
            isPlaying = false;
        }
    });

    // Monitoramento via SmartPlayer API (Exata)
    setInterval(function() {
        if (window.smartplayer && window.smartplayer.instances && window.smartplayer.instances.length > 0) {
            var inst = window.smartplayer.instances[0];
            
            if (inst.state === 'VIDEO_PLAYING' || inst.video.playing === true) {
                if (!isPlaying) {
                    isPlaying = true;
                    startTimer();
                }
            } else if (inst.state === 'VIDEO_PAUSED' || inst.video.paused === true) {
                if (isPlaying) {
                    isPlaying = false;
                }
            }
            
            var currentTime = inst.video.currentTime;
            if (window.lastVideoTime !== undefined && currentTime > window.lastVideoTime) {
                if (!isPlaying) {
                    isPlaying = true;
                    startTimer();
                }
            }
            window.lastVideoTime = currentTime;
        }
    }, 500);

    // Fallback: Tentar capturar eventos via custom events se o postMessage falhar
    document.addEventListener('vturb_play', function() {
        isPlaying = true;
        startTimer();
    });
    document.addEventListener('vturb_pause', function() {
        isPlaying = false;
    });

})();