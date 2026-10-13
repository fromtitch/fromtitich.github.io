date_created: 2026-10-13
date_updated: 2026-10-13
---

# Boîtes de Leitner — utiliser les boîtes sans Claude

Ce dossier regroupe les deux boîtes dans un **petit site autonome** : aucun compte, aucune connexion à un service extérieur, aucun abonnement. Tout est dans le dossier `public/`.

- [[Cours/MCV/Boîte de Leitner - Démarche mercatique/LISEZMOI|Démarche mercatique]] : 127 cartes
- [[Cours/Économie-droit/Boîte de Leitner - Économie-droit/LISEZMOI|Économie-droit]] : 169 cartes

## Contenu de `public/`

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : les deux boîtes, avec « Réviser » et « Cartes à imprimer » |
| `mercatique/` et `economie-droit/` | L'application (`index.html`), les cartes à imprimer et une copie de `cartes.md` |
| `manifest.webmanifest`, `icone-*.png` | Permettent d'**installer** le site comme une application sur téléphone |
| `sw.js` | Permet d'utiliser les boîtes **hors connexion**, une fois le site ouvert une première fois |

## Trois façons de l'utiliser

### 1 · Sur un ordinateur ou une clé USB (sans internet)

Copier le dossier `public/` où vous voulez (ordinateurs de la salle, clé USB, partage réseau du lycée), puis ouvrir `index.html` dans Firefox, Chrome ou Edge.

- Fonctionne **sans internet**.
- La progression est enregistrée dans le navigateur de **ce poste**. Sur un poste partagé, chaque élève doit garder sa session Windows ou son profil de navigateur.
- Sur téléphone, cette méthode marche mal : les navigateurs mobiles ouvrent difficilement un fichier HTML local. Utiliser plutôt la méthode 2.

### 2 · En ligne sur la Forge des communs numériques éducatifs (recommandé pour les téléphones)

La Forge ([forge.apps.education.fr](https://forge.apps.education.fr)) est un service gratuit du ministère, ouvert aux personnels de l'Éducation nationale avec leurs identifiants académiques.

1. Se connecter à la Forge et créer un **nouveau projet vide**, en visibilité **publique** (sinon les élèves ne pourront pas ouvrir le site).
2. Déposer dans le projet le fichier `.gitlab-ci.yml` et le dossier `public/` de ce dossier, depuis l'interface web (« Téléverser un fichier ») ou avec git.
3. Le site est publié automatiquement en une à deux minutes. Son adresse apparaît dans le projet, menu **Déployer → Pages**. Elle ressemble à `https://votre-identifiant.forge.apps.education.fr/nom-du-projet/`.
4. Donner l'adresse aux élèves, par exemple avec un QR code projeté en classe.

Les élèves ouvrent l'adresse, puis **installent** le site depuis leur navigateur (la marche à suivre est sur la page d'accueil). Après la première ouverture, les boîtes fonctionnent **hors connexion**.

### 3 · Sur un autre hébergement web

Tout hébergement qui sert des pages HTML convient : site de l'établissement, espace web académique, ENT s'il affiche les pages HTML. Déposer le **contenu** du dossier `public/`. L'installation sur téléphone et le mode hors connexion demandent une adresse en **https**.

## Mettre à jour les cartes

1. Modifier le `cartes.md` de la boîte concernée (voir son mode d'emploi).
2. Dans ce dossier : `python3 construire.py`. Le script relance la génération des deux boîtes et refait `public/`.
3. Redéposer le dossier `public/` (méthode 2 ou 3) ou le recopier (méthode 1).

Les élèves reçoivent les nouvelles cartes à leur prochaine connexion. Ils **gardent leur progression** sur les cartes dont la question n'a pas changé.

## Ajouter une autre boîte

1. Copier le dossier d'une boîte existante (`cartes.md`, `generer.py`, `modele/`) et remplacer les cartes. Changer le `titre:` du `cartes.md` : c'est lui qui sépare les progressions.
2. Ajouter une ligne dans la liste `BOITES` en haut de `construire.py` : nom du dossier dans le site, chemin de la boîte, phrase de présentation.
3. Lancer `python3 construire.py`.

> [!note] Ce que le site ne fait pas
> La progression de chaque élève reste **sur son appareil**. L'enseignant ne la voit pas, et elle ne passe pas d'un appareil à l'autre. Si un élève efface les données de son navigateur, il repart de zéro.
