/* Cache hors ligne de Sportofoly.
   Stratégie : le cache D'ABORD. L'application est entièrement statique et
   doit fonctionner au stade sans réseau — aller interroger le serveur avant
   d'afficher le jeu reviendrait à dépendre d'une connexion qu'on n'a pas.
   Une nouvelle version est récupérée en arrière-plan et prend la main à
   l'ouverture suivante, jamais au milieu d'une séance. */
var CACHE = 'sportofoly-v72a774c4c6';
var FICHIERS = ['./', './index.html', './manifest.webmanifest',
                './icone-180.png', './icone-192.png', './icone-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE)
    .then(function (c) { return c.addAll(FICHIERS); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (noms) {
    return Promise.all(noms.filter(function (n) { return n !== CACHE; })
      .map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (rep) {
      if (rep) return rep;
      return fetch(e.request).catch(function () {
        /* hors ligne et pas en cache : on rend l'application elle-même */
        return caches.match('./index.html');
      });
    })
  );
});