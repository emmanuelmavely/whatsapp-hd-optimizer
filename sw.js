const CACHE_NAME = 'wa-hd-assets-v4';
const CORE = [
  './', './index.html', './manifest.json',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/classes.js',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/worker.js',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/esm/index.js',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js',
  'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => { if (response.ok && (event.request.url.startsWith(self.location.origin) || event.request.url.includes('cdn.jsdelivr.net'))) caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone())); return response; }))); });
