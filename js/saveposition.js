// Sauvegarder la position de lecture à chaque mise en pause ou à la fermeture de la page
const savePosition = () => {
    const currentTime = videoElement.currentTime;
    localStorage.setItem(storageKey, currentTime);
    console.log(`Position de lecture sauvegardée : ${currentTime} secondes pour la vidéo ${videoUrl}.`);
};

// Sauvegarder la position quand la vidéo est mise en pause
videoElement.addEventListener('pause', savePosition);

// Sauvegarder la position lorsque l'utilisateur quitte la page
window.addEventListener('beforeunload', savePosition);

// Supprimer la position si la vidéo est terminée
videoElement.addEventListener('ended', () => {
    localStorage.removeItem(storageKey);
    console.log('Lecture terminée, position supprimée pour la vidéo ' + videoUrl);
});

// Récupérer la position de lecture enregistrée pour cette vidéo
const savedPosition = localStorage.getItem(storageKey);
if (savedPosition) {
    videoElement.currentTime = parseFloat(savedPosition);
    console.log(`Reprise de la lecture à la position : ${savedPosition} secondes pour la vidéo ${videoUrl}.`);
}

// Fonction pour générer une clé unique basée sur l'URL de la vidéo
const generateStorageKey = (url) => `videoPlayerPosition_${url}`;

// Récupérer l'URL de la vidéo
const videoUrl = videoSource.src;
const storageKey = generateStorageKey(videoUrl);