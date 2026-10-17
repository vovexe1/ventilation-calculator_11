const CACHE_NAME = "ventilation-calculator-v1";
const FILES = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(response => {
    const copy = response.clone(); caches.open(CACHE_NAME).then(c => c.put(e.request, copy)); return response;
  }).catch(() => caches.match("./index.html"))));
});
