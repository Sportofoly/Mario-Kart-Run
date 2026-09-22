/* Cache hors ligne de Sportofoly.
   Stratégie : le cache D'ABORD. L'application est entièrement statique et
   doit fonctionner au stade sans réseau — aller interroger le serveur avant
   d'afficher le jeu reviendrait à dépendre d'une connexion qu'on n'a pas.
   Une nouvelle version est récupérée en arrière-plan et prend la main à
   l'ouverture suivante, jamais au milieu d'une séance. */
var CACHE = 'sportofoly-v56637fb354';
var VERSION = 'v56637fb354';
var FICHIERS = ['./', './index.html', './manifest.webmanifest',
                './icone-180.png', './icone-192.png', './icone-512.png'];

/* L'INSTALLATION NE DOIT JAMAIS METTRE EN CACHE L'ANCIENNE PAGE.

   C'ÉTAIT LE BUG, et il était invisible : `cache.addAll()` lance des
   requêtes ORDINAIRES. GitHub Pages répond `max-age=600` sur chaque
   fichier, et son réseau de diffusion garde lui aussi une copie
   quelques minutes. Le navigateur découvrait donc le nouveau `sw.js`
   (grâce à `updateViaCache: none`), l'installait, changeait de version
   — et remplissait son cache neuf avec l'ANCIEN `index.html`, servi de
   mémoire. L'empreinte changeait, l'application non. Il fallait
   attendre, puis recharger encore, sans savoir pourquoi.

   Deux verrous, et il faut les deux :
     `cache: 'reload'` ignore le cache HTTP du navigateur ;
     `?v=<empreinte>` rend l'adresse unique, donc invisible pour le
       cache du réseau de diffusion — il n'a rien à en servir.
   On range ensuite la réponse SOUS L'ADRESSE SANS QUESTION : c'est
   celle que la page demandera. */
function telechargerFrais(c, url) {
  var frais = new Request(url + (url.indexOf('?') < 0 ? '?v=' : '&v=') + VERSION,
                          { cache: 'reload' });
  return fetch(frais).then(function (rep) {
    if (!rep || !rep.ok) throw new Error('hs');
    return c.put(url, rep);
  });
}

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE)
    .then(function (c) {
      return Promise.all(FICHIERS.map(function (f) {
        /* Une icône manquante ne doit pas faire échouer l'installation
           entière : c'est la PAGE qui compte. */
        return telechargerFrais(c, f).catch(function () {
          return c.add(f).catch(function () {});
        });
      }));
    })
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