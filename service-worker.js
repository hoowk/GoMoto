const CACHE_NAME = 'gomoto-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/icons/moto.png',
    '/icons/1moto.png',
    'https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css',
    'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
