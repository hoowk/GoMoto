const CACHE_NAME = 'gomoto-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/styles.css',
  '/icons/moto.png',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css',
  'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'UPDATE_LOCATION') {
    // Simulação de envio para o servidor
    const { nome, position } = event.data.data;
    console.log(`Atualizando localização de ${nome}:`, position);
    
    // Aqui você faria a chamada real para seu backend
    // Exemplo com fetch:
    /*
    fetch('https://seuservidor.com/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        motoboy: nome,
        latitude: position.lat,
        longitude: position.lng,
        accuracy: position.accuracy,
        timestamp: position.timestamp
      })
    });
    */
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-location') {
    console.log('Sincronizando localização em segundo plano');
  }
});
