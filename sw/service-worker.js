// service-worker.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

// Activer le précaching des fichiers
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Mise en cache des fichiers CSS et JS
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script',
    new workbox.strategies.CacheFirst({
        cacheName: 'static-resources',
        plugins: [
            {
                cacheWillUpdate: async ({ request, response }) => {
                    if (!response || response.status !== 200) {
                        return null;
                    }
                    return response;
                },
            },
        ],
    })
);

// Mise en cache des images
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            {
                cacheWillUpdate: async ({ request, response }) => {
                    if (!response || response.status !== 200) {
                        return null;
                    }
                    return response;
                },
            },
        ],
    })
);
