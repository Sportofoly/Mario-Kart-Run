/* Cache hors ligne de Sportofoly.
   Stratégie : le cache D'ABORD. L'application est entièrement statique et
   doit fonctionner au stade sans réseau — aller interroger le serveur avant
   d'afficher le jeu reviendrait à dépendre d'une connexion qu'on n'a pas.
   Une nouvelle version est récupérée en arrière-plan et prend la main à
   l'ouverture suivante, jamais au milieu d'une séance. */
var CACHE = 'sportofoly-v131c154ec8';
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
      /* SERVI DU CACHE, MAIS RAFRAÎCHI DERRIÈRE.

         Le cache d'abord reste la règle : au stade il n'y a pas de
         réseau, et attendre le serveur avant d'afficher le jeu serait
         dépendre d'une connexion qu'on n'a pas.

         Mais `ignoreSearch: true` rend toute astuce d'adresse inutile :
         `?frais=1` tombe sur la même entrée de cache. Une page pouvait
         donc rester ancienne indéfiniment. On relance donc la requête en
         arrière-plan et on remplace l'entrée : la fois suivante est à
         jour, même si la bascule de version a échoué.

         Silencieux hors ligne : un échec est le cas NORMAL au stade. */
      if (rep) {
        fetch(e.request).then(function (frais) {
          if (frais && frais.ok) {
            caches.open(CACHE).then(function (c) { c.put(e.request, frais.clone()); });
          }
        }).catch(function () {});
        return rep;
      }
      return fetch(e.request).catch(function () {
        /* hors ligne et pas en cache : on rend l'application elle-même */
        return caches.match('./index.html');
      });
    })
  );
});