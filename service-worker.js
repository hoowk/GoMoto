self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('motoboy-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/motoboy-icon.png',
        '/icons/motoboy-icon-512.png',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
