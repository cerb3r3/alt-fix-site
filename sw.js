const CACHE_NAME = 'altfix-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/contact.html',
  '/services.html',
  '/tarifs.html',
  '/merci.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/assets/img/favicon.png',
  '/assets/img/logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
