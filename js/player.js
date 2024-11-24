 document.addEventListener('DOMContentLoaded', () => {
            const playerControls = ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip', 'airplay', 'settings', 'fullscreen', 'cast'];
            const player = new Plyr('#player', {
                controls: playerControls,
                quality: {
                    default: 720,
                    options: [720]
                },
                playsinline: true,
                keyboard: { focused: true, global: true },
                fullscreen: { enabled: true, fallback: true, iosNative: true },
                disableContextMenu: true,
                i18n: {
                      restart: 'Recommencer',
            rewind: 'Revenir de {seektime}s',
            play: 'Play',
            pause: 'Pause',
            fastForward: 'Passer {seektime}s',
            seek: 'Rechercher',
            seekLabel: '{currentTime} de {duration}',
            played: 'Lancé',
            buffered: 'Buffered',
            currentTime: 'Temps actuel',
            duration: 'Durée',
            volume: 'Volume',
            mute: 'Silence',
            unmute: 'Son activé',
            enableCaptions: 'Activer les sous-titres',
            disableCaptions: 'Désactiver les sous-titres',
            download: 'Télécharger',
            enterFullscreen: 'Plein écran',
            exitFullscreen: 'Sortir du plein écran',
            frameTitle: 'Lecteur pour {title}',
            captions: 'Sous-titres',
            settings: 'Réglages',
            pip: 'Picture-In-Picture',
            menuBack: 'Retour au menu précédent',
            speed: 'Vitesse',
            normal: 'Normal',
            quality: 'Qualité',
            loop: 'Boucle',
            start: 'Début',
            end: 'Fin',
            all: 'Tous',
            reset: 'Réinitialiser',
            disabled: 'Désactivé',
            enabled: 'Activé',
            advertisement: 'Publicité',
                },
            });

    const videoElement = document.getElementById('player');
    const hlsSource = videoElement.querySelector('source').src;

    // Utiliser l'URL comme clé unique pour la vidéo
    const storageKey = `videoCurrentTime_${encodeURIComponent(hlsSource)}`;

    // Charger le temps de lecture
    const loadVideoTime = () => {
        const savedTime = localStorage.getItem(storageKey);
        if (savedTime) {
            videoElement.currentTime = parseFloat(savedTime);
        }
    };

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsSource);
        hls.attachMedia(videoElement);

        videoElement.addEventListener('ended', () => {
            hls.loadSource(hlsSource);
            videoElement.play(); // Replay video
        });

        // Sauvegarder le temps de lecture
        videoElement.addEventListener('timeupdate', () => {
            localStorage.setItem(storageKey, videoElement.currentTime);
        });

        loadVideoTime(); // Charger le temps de lecture à la fin de la configuration
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for native HLS support (Safari)
        videoElement.src = hlsSource;
        videoElement.addEventListener('ended', () => {
            videoElement.play(); // Replay video
        });
        loadVideoTime(); // Charger le temps de lecture à la fin de la configuration
    }
});