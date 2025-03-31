const CACHE_NAME = 'gomoto-v3';
const ASSETS = [
  './',
  './index.html',
  './login.html',
  './install.js',
  './icons/logomoto-192x192.png',
  './icons/moto.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});

self.addEventListener('message', (e) => {
  if (e.data.type === 'UPDATE_LOCATION') {
    const { nome, position } = e.data.data;
    // Simulação de envio para backend
    console.log(`📍 ${nome}: ${position.lat}, ${position.lng}`);
  }
});
