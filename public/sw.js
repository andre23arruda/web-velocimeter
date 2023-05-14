const CACHE_NAME = 'to-do'
const urlsToCache = [
    '/',
    '/static/css/main.7d4378ab.chunk.css',
    '/static/js/2.18097d84.chunk.js',
    '/static/js/main.4e574c7e.chunk.js',
    'index.html',
    'manifest.json',
    'favicon.ico',
    'logo192.png',
    'logo512.png',
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response
            }
            return fetch(event.request)
        })
    )
})

self.addEventListener('activate', (event) => {
    let cacheWhitelist = ['to-do']
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})