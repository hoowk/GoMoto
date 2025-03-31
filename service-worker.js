const CACHE_NAME = 'gomoto-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './login.html',
  './icons/logomoto128.png',
  './icons/moto.png',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
