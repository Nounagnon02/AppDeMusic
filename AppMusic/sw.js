// Service Worker pour PWA
const CACHE_NAME = 'maestrospirit-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/app.js',
    '/assets/js/audio-engine.js',
    '/assets/js/gamification.js',
    '/assets/js/music-theory.js',
    '/pages/voice.html',
    '/pages/instruments.html',
    '/pages/theory.html',
    '/pages/spirituality.html',
    '/pages/tools.html',
    '/pages/profile.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});