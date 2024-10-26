// sw/service-worker.js

if (typeof workbox === 'undefined') {
    console.error('Workbox n\'est pas chargé.');
} else {
    console.log('Workbox est prêt.');

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'document' || request.destination === 'image' || request.destination === 'script' || request.destination === 'style',
        new workbox.strategies.CacheFirst({
            cacheName: 'crimson-cache-v1',
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'style' || request.destination === 'script',
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );
}
