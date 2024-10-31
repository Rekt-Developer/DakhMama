// Nom du cache
const CACHE_NAME = 'v3';

// Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/css/bootstrap.min.css',
    '/css/font-awesome.min.css',
    '/css/ionicons.css',
    '/css/jquery-eu-cookie-law-popup.css',
    '/css/megamenu.css',
    '/css/owl.carousel.min.css',
    '/css/player-crimson.css',
    '/css/responsive.css',
    '/css/search.css',
    '/css/splide.min.css',
    '/css/style-three.css',
    '/css/validatesecurity.css',
    '/js/bootstrap.min.js',
    '/js/custom-main.js',
    '/js/FWDEVPlayer.js',
    '/js/jquery-3.3.1.min.js',
    '/js/jquery.easing.min.js',
    '/js/jquery.nice-select.min.js',
    '/js/megamenu.js',
    '/js/owl.carousel.min.js',
    '/js/splide.min.js',
    '/js/sweetalert2@11.js',
    '/img/logo.png',
    '/img/hors-ligne.png',
    '/img/logo-mobile.png',
    '/sw/hors-ligne.html' 
    
];

// Installation du service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Gestion des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Si la requête échoue (par exemple, hors ligne), retourner index.html
            return caches.match('/index.html').then((response) => {
                // Retourner index.html uniquement si on essaie d'accéder à une autre page
                if (!response && event.request.mode === 'navigate') {
                    return caches.match('sw/hors-ligne.html'); // Retourner la page 404 si aucune autre page n'est trouvée
                }
                return response;
            });
        })
    );
});