

// Nom du cache pour les ressources précachées
const PRECACHE = 'precache-v2';

// Liste des ressources locales à précharger
const PRECACHE_URLS = [
    '../hors-ligne.html', 
    '../css/bootstrap.min.css',
    '../css/font-awesome.min.css',
    '../css/ionicons.css',
    '../css/jquery-eu-cookie-law-popup.css',
    '../css/megamenu.css',
    '../css/owl.carousel.min.css',
    '../css/player-crimson.css',
    '../css/responsive.css',
    '../css/search.css',
    '../css/splide.min.css',
    '../css/style-three.css',
    '../css/validatesecurity.css',
    '../js/bootstrap.min.js',
    '../js/custom-main.js',
    '../js/FWDEVPlayer.js',
    '../js/jquery-3.3.1.min.js',
    '../js/jquery.easing.min.js',
    '../js/jquery.nice-select.min.js',
    '../js/megamenu.js',
    '../js/owl.carousel.min.js',
    '../js/splide.min.js',
    '../js/sweetalert2@11.js',
    '../img/logo.png',
    '../img/hors-ligne.png',
    '../img/logo-mobile.png'
];

// Gestionnaire d'installation : précache les ressources nécessaires
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// Gestionnaire d'activation : nettoyage des anciens caches
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Gestionnaire de récupération avec redirection vers hors-ligne.html si offline
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        // Si la ressource est en cache, on la renvoie
        if (response) {
          return response;
        }
        // Si la ressource n'est pas en cache, on essaie de la récupérer
        return fetch(event.request).catch(() => {
          // Si la requête échoue (offline), on renvoie hors-ligne.html
          return caches.match('../hors-ligne.html');
        });
      })
    );
  });
  