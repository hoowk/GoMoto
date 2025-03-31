const CACHE_NAME = 'gomoto-v1';
const ASSETS = [
  './',
  './index.html',
  './login.html',
  './icons/logomoto-192x192.png',
  './icons/moto.png',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});
