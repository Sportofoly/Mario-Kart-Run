# Mettre Sportofoly sur GitHub Pages, puis sur l'iPad

**Tu n'as RIEN à installer sur la tablette.** GitHub sert simplement une page web ; la
tablette n'a besoin que de Safari. Tout le travail se fait sur l'ordinateur.

Compte le tout à une quinzaine de minutes, une seule fois.

---

## Ce que contient ce dossier

C'est le **modèle** : tout l'habillage du jeu — images des objets, pions dessinés, plateau
calibré, marqueur de case objet, faces des dés, réglages de course — et **aucune donnée
d'élève**. C'est volontaire : un dépôt GitHub Pages gratuit est forcément **public**, et des
prénoms d'élèves n'ont rien à y faire.

Tes classes s'ajoutent ensuite, directement sur ta tablette, en important ton fichier
`Sportofoly-MES-DONNEES.json`. Elles ne quittent jamais tes appareils.

---

# PARTIE 1 — Mettre le modèle en ligne (sur l'ordinateur)

## 1. Décompresser

Clic droit sur `Sportofoly-MODELE-iPad.zip` → **Extraire tout**. Tu obtiens un dossier `pwa`
contenant 6 fichiers :

```
index.html              le jeu entier
sw.js                   le cache hors ligne
manifest.webmanifest    nom, icône, plein écran
icone-180.png
icone-192.png
icone-512.png
```

Ouvre ce dossier `pwa` — tu vas avoir besoin de voir les fichiers.

## 2. Créer le dépôt

1. Va sur **github.com** et connecte-toi
2. En haut à droite, le **+** → **New repository**
3. **Repository name** : `sportofoly`
4. Coche **Public** *(obligatoire : Pages n'est gratuit que sur un dépôt public)*
5. Ne coche **rien** d'autre — surtout pas « Add a README file »
6. **Create repository**

## 3. Déposer les fichiers

Sur la page qui s'affiche, clique **uploading an existing file**
*(ou : onglet **Add file** → **Upload files**)*

Dans ta fenêtre de fichiers, ouvre le dossier `pwa`, sélectionne **les 6 fichiers**
(Ctrl+A à l'intérieur du dossier) et fais-les glisser dans la zone de dépôt.

⚠️ Glisse **les 6 fichiers**, pas le dossier `pwa` lui-même.

Attends que les 6 apparaissent (`index.html` fait ~1,8 Mo, laisse-lui un moment), puis
descends et clique **Commit changes**.

## 4. Activer Pages

1. Onglet **Settings** (en haut du dépôt)
2. Menu de gauche → **Pages**
3. **Source** : *Deploy from a branch*
4. **Branch** : `main` — dossier : `/ (root)`
5. **Save**

Patiente une à deux minutes, puis rafraîchis la page Settings → Pages. Une adresse apparaît :

```
https://TON-PSEUDO.github.io/sportofoly/
```

**Note cette adresse.** Ouvre-la sur l'ordinateur pour vérifier que le jeu s'affiche, avec les
images qui volent sur l'accueil.

---

# PARTIE 2 — Installer sur l'iPad

## 5. Ouvrir et installer

1. Sur l'iPad, ouvre **Safari** *(pas Chrome — l'ajout à l'écran d'accueil ne fonctionne
   correctement que depuis Safari)*
2. Tape ton adresse `https://TON-PSEUDO.github.io/sportofoly/`
3. **Laisse la page se charger entièrement** — c'est à ce moment qu'elle se copie sur la
   tablette pour l'usage hors ligne
4. Appuie sur **Partager** (le carré avec la flèche vers le haut)
5. **Sur l'écran d'accueil** → nomme-la *Sportofoly* → **Ajouter**

Une icône en damier apparaît.

## 6. Vérifier le hors-ligne — à faire MAINTENANT, pas au stade

1. Active le **mode Avion**
2. Ouvre Sportofoly depuis l'icône

Si le jeu s'ouvre, tu es prêt. Sinon, désactive le mode Avion, rouvre l'adresse dans Safari,
laisse-la charger plus longtemps, et refais l'ajout à l'écran d'accueil.

---

# PARTIE 3 — Charger tes classes

## 7. Amener le fichier sur la tablette

Le fichier `Sportofoly-MES-DONNEES.json` est dans ton dossier `Téléchargements`. Fais-le
parvenir à l'iPad par le moyen qui t'arrange :

- **iCloud Drive** : glisse-le dans iCloud Drive sur le PC, il apparaît dans l'app Fichiers
- **Mail** : envoie-le-toi, puis enregistre la pièce jointe dans Fichiers
- **Câble** : via l'explorateur Windows

## 8. Importer

Dans Sportofoly sur l'iPad :

**⚙️ Réglages** → section **DONNÉES** → **⤒ Importer une sauvegarde**
→ choisis `Sportofoly-MES-DONNEES.json` → **Importer**

Tu retrouves tes 6 classes, tes 130 élèves, les VMA de ta 3D, et tes réglages.

---

# Au quotidien

**Prépare tes séances chez toi**, avec le réseau. Tout est enregistré sur la tablette.

**Au stade**, ouvre l'icône. Aucun réseau nécessaire.

**Après chaque séance qui compte** : ⚙️ → DONNÉES → **⤓ Exporter mes données**. Sur iPad, la
feuille de partage s'ouvre — *Enregistrer dans Fichiers*. C'est ta vraie sauvegarde, celle qui
survit à un changement de tablette. Le stockage d'un navigateur peut toujours être purgé.

**Partager le jeu à un collègue** : envoie-lui simplement ton adresse
`https://TON-PSEUDO.github.io/sportofoly/`. Il verra le jeu complet, avec tous les visuels, et
**aucune de tes données**. Il crée ses propres classes.

**Mettre à jour** : dans le dépôt GitHub, **Add file → Upload files**, redépose les fichiers
modifiés, **Commit changes**. L'application se met à jour à la prochaine ouverture **avec du
réseau** — jamais au milieu d'une séance.

---

# Si ça coince

| Symptôme | Cause probable |
|---|---|
| Page blanche ou 404 après Save | Pages met 1–2 min à démarrer. Rafraîchis. |
| Le jeu s'affiche sans style | Les 6 fichiers ne sont pas au même niveau. Ils doivent être à la racine du dépôt, pas dans un sous-dossier. |
| Mode Avion → « impossible d'ouvrir » | La page n'a pas fini de se charger avant l'ajout. Refais l'étape 5. |
| L'import ne trouve pas le fichier | Il doit être dans l'app **Fichiers**, pas dans Photos ni dans Mail. |
