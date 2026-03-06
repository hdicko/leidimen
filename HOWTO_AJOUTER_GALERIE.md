# Guide pratique : Ajouter une galerie photos

**Type :** How-to Guide  
**Prérequis :** Accès à Netlify CMS *ou* environnement de développement Hugo configuré  
**Résultat :** Les photos sont affichées sur le site dans une grille cliquable avec visionneuse plein écran (Fancybox).

---

## Vue d'ensemble : deux usages possibles

| Besoin | Solution | URL résultante |
|---|---|---|
| **Galerie autonome** — une page dédiée à un album photos | Page bundle dans `content/galleries/` | `/galleries/nom-de-la-galerie/` |
| **Galerie dans un article** — photos insérées au milieu d'un texte | Shortcode `{{< gallery >}}` dans un article post | `/posts/2025/nom-de-larticle/` |

> ⚠️ **Ne jamais mélanger les deux.** Une page `content/galleries/` génère automatiquement sa grille — ajouter `{{< gallery >}}` dans le corps de la page doubleraient les images.

---

## Cas A — Créer une galerie dédiée

### Méthode 1 : Via le système de fichiers (développeur)

Une galerie est un **page bundle** Hugo : un dossier contenant un fichier `index.md` et les images côte à côte. Les images doivent être dans le même dossier que `index.md` — c'est ce qu'on appelle des *page resources*.

#### 1. Créer la structure de dossiers

```bash
# Remplacez "nom-de-la-galerie" par un identifiant en minuscules et tirets
mkdir -p content/galleries/nom-de-la-galerie
```

#### 2. Créer le fichier `index.md`

Créez `content/galleries/nom-de-la-galerie/index.md` avec ce contenu :

```yaml
---
title: "Titre de la galerie"
description: "Description courte pour le SEO et les aperçus."
date: 2025-01-15
type: "galleries"
slug: "nom-de-la-galerie"
draft: false
villages: ["dorool"]        # optionnel
categories: ["Éducation"]   # optionnel
tags: ["photos", "2025"]    # optionnel
weight: 0
---

Texte introductif facultatif affiché au-dessus de la grille photos.
```

> ⚠️ **Le champ `type: "galleries"` est obligatoire.** Sans lui, Hugo ne sait pas quel template utiliser et la galerie ne s'affiche pas correctement.

#### 3. Copier les photos dans le dossier

```bash
# Copiez vos photos dans le dossier de la galerie
cp ~/Photos/evenement/*.jpg content/galleries/nom-de-la-galerie/

# Résultat attendu :
# content/galleries/nom-de-la-galerie/
# ├── index.md
# ├── photo-001.jpg
# ├── photo-002.jpg
# └── photo-003.jpg
```

**Formats acceptés :** JPG, PNG, WebP  
**Taille recommandée :** maximum 2 Mo par image — Hugo génère automatiquement des miniatures optimisées (WebP 400×300, qualité 85).

> 💡 **Nommage des fichiers :** utilisez des noms en minuscules sans espaces ni caractères accentués.  
> ✅ `ecole-dorool-2025.jpg`  ❌ `École Dorool été 2025.JPG`

#### 4. Publier

```bash
git add content/galleries/nom-de-la-galerie/
git commit -m "feat(gallery): ajouter galerie nom-de-la-galerie"
git push
```

---

### Méthode 2 : Via Netlify CMS (navigateur)

> ℹ️ Netlify CMS crée bien le fichier `index.md` dans le bon dossier (`content/galleries/slug/`). En revanche, **les images doivent être ajoutées manuellement par un développeur** dans le dossier de la galerie — le CMS ne peut pas téléverser des images directement comme page resources.
>
> **Utilisation recommandée du CMS :** créer la fiche descriptive (titre, description, métadonnées), puis confier l'ajout des photos à un développeur.

#### Étapes

1. Accédez à **`https://hdicko.github.io/leidimen/admin/`** et connectez-vous.
2. Dans le menu latéral, cliquez sur **📸 Galeries**.
3. Cliquez sur **« Nouvelle Galerie »**.
4. Remplissez les champs :

| Champ CMS | Obligatoire | Remarque |
|---|---|---|
| **Titre de la galerie** | ✅ | Génère aussi l'URL (`/galleries/titre-de-la-galerie/`) |
| **Date** | ✅ | Date de l'événement ou de la publication |
| **Description** | Recommandé | Texte SEO, 150–160 caractères idéalement |
| **Lieu** | Optionnel | Ex : `Dorool`, `Paris` |
| **Image de couverture** | Optionnel | Aperçu dans les listings |

5. Cliquez sur **« Publish »**.
6. Transmettez à un développeur le nom exact de la galerie pour qu'il y dépose les photos.

---

## Cas B — Galerie dans un article

Utilisez le shortcode `{{< gallery >}}` pour afficher une galerie de photos **au sein d'un article** (`content/posts/`).

### Prérequis : l'article doit être un page bundle

La galerie dans un article ne fonctionne que si l'article est structuré comme un **page bundle** (dossier avec `index.md`), pas comme un fichier seul.

```
# ✅ Structure correcte (page bundle)
content/posts/2025/visite-dorool/
├── index.md
├── photo-arrivee.jpg
├── photo-ecole.jpg
└── photo-equipe.jpg

# ❌ Ne fonctionne pas (fichier seul)
content/posts/2025/visite-dorool.md   ← images introuvables
```

### Étapes

#### 1. Créer le dossier de l'article

```bash
mkdir -p content/posts/2025/visite-dorool
```

#### 2. Créer `index.md`

```yaml
---
title: "Visite à Dorool — Mars 2025"
date: 2025-03-15
type: "posts"
villages: ["dorool"]
categories: ["Actualités"]
draft: false
---

Compte-rendu de notre visite à Dorool en mars 2025.

{{< gallery >}}

La visite s'est déroulée en présence de...
```

#### 3. Copier les photos

```bash
cp ~/Photos/visite/*.jpg content/posts/2025/visite-dorool/
```

> 💡 Le shortcode `{{< gallery >}}` charge automatiquement la visionneuse Fancybox et génère les miniatures. Aucun paramètre requis.

---

## Ajouter des légendes aux photos

Pour ajouter une légende à une photo spécifique, créez un fichier de ressources `index.md` de ressources (ou ajoutez une section `resources` dans le frontmatter) :

```yaml
---
title: "Titre de la galerie"
type: "galleries"
# ...

resources:
  - src: "photo-ecole.jpg"
    title: "La nouvelle salle de classe"
    params:
      caption: "Inauguration de la salle de classe de l'école de Dorool, janvier 2025"
  - src: "photo-equipe.jpg"
    title: "L'équipe Leidimen sur place"
```

La légende apparaît dans la visionneuse Fancybox au survol et en bas de l'image en plein écran.

---

## Vérifier le résultat

### En développement local

```bash
./dev-server.sh
# Galerie dédiée → http://localhost:1313/leidimen/galleries/
# Article avec galerie → http://localhost:1313/leidimen/posts/2025/visite-dorool/
```

### En production

Après `git push` ou publication via Netlify CMS, attendez 2 à 5 minutes puis :

1. Ouvrez **`https://hdicko.github.io/leidimen/galleries/`** (ou l'URL de l'article).
2. La grille de photos doit s'afficher — 4 colonnes sur desktop, 2 sur mobile.
3. Cliquez sur une photo : la visionneuse plein écran doit s'ouvrir avec navigation ← → entre les images.

### La galerie ne s'affiche pas ?

| Symptôme | Cause probable | Solution |
|---|---|---|
| Page vide ou texte seul | `type: "galleries"` absent | Ajoutez `type: "galleries"` dans le frontmatter |
| Grille visible, mais clic sans effet | Fancybox non chargé | Vérifiez que le build a réussi — consultez [GitHub Actions](https://github.com/hdicko/leidimen/actions) |
| Aucune photo dans la grille | Images pas en page resources | Les images doivent être **dans le même dossier** que `index.md`, pas dans `static/` |
| Photos dupliquées | `{{< gallery >}}` utilisé sur une page `galleries/` | Retirez le shortcode — le template génère déjà la grille automatiquement |
| Erreur de build | Nom de fichier avec espaces ou accents | Renommez les fichiers en `minuscules-avec-tirets.jpg` |

---

## Références

- Template galerie dédiée : [`layouts/galleries/single.html`](./layouts/galleries/single.html)
- Shortcode galerie dans article : [`layouts/shortcodes/gallery.html`](./layouts/shortcodes/gallery.html)
- Config CMS (section Galeries) : [`static/admin/config.yml`](./static/admin/config.yml)
- Exemples de galeries complètes :
  - [`content/galleries/ecole-de-dorool/`](./content/galleries/ecole-de-dorool/) — galerie avec nombreuses photos
  - [`content/galleries/paris/`](./content/galleries/paris/) — galerie simple
