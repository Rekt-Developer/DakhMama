module.exports = {
    globDirectory: './', // Le répertoire de votre projet
    globPatterns: [
        '**/*.{html,css,js,png,jpg,jpeg,gif,svg,json}', // Types de fichiers à mettre en cache
    ],
    swDest: 'service-worker.js', // Destination du service worker
    cleanupOutdatedCaches: true, // Supprimer les caches obsolètes
    ignoreURLParametersMatching: [/./], // Ignorer les paramètres d'URL
};
