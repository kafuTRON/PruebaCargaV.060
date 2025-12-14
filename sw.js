/* ========== SERVICE WORKER PARA CACHE ========== */

const CACHE_NAME = 'industrias-tkm-v1';
const STATIC_CACHE = [
    '/',
    '/index.html',
    '/css/index.css',
    '/css/novedades.css',
    '/css/tiktok.css',
    '/js/index.js',
    '/js/tiktok.js',
    '/recursos/M&M/M&M.png',
    '/recursos/A&A/A&A.png',
    '/recursos/CDL/CDL.png'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(STATIC_CACHE);
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar requests
self.addEventListener('fetch', event => {
    // Solo cachear requests GET
    if (event.request.method !== 'GET') return;

    // Estrategia: Cache First para recursos estáticos
    if (event.request.url.includes('/css/') || 
        event.request.url.includes('/js/') || 
        event.request.url.includes('/recursos/')) {
        
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
        return;
    }

    // Estrategia: Network First para HTML y TikTok
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Si la respuesta es válida, clonar y guardar en cache
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                // Si falla la red, intentar desde cache
                return caches.match(event.request);
            })
    );
});