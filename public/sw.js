// Service worker des boîtes de Leitner : réseau d'abord, copie locale si pas de connexion.
const CACHE = 'leitner-20261013-114340';
const FICHIERS = ["./", "./index.html", "./manifest.webmanifest", "./icone-192.png", "./icone-512.png", "./mercatique/", "./mercatique/index.html", "./mercatique/cartes-a-imprimer.html", "./economie-droit/", "./economie-droit/index.html", "./economie-droit/cartes-a-imprimer.html"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((rep) => {
        const copie = rep.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copie));
        return rep;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })
        .then((r) => r || caches.match('./index.html')))
  );
});
