# Guide de Création de Contenu - Leidimen

**Guide unifié pour créer des articles sur le site Leidimen**

**Date:** Janvier 2026  
**Version:** 2.0  
**Auteur:** Documentation Technique Leidimen

---

## Table des matières

1. [Introduction](#introduction)
2. [Choix de la méthode](#choix-de-la-methode)
3. [Méthode 1 : Interface Web CMS](#methode-1-interface-web-cms)
4. [Méthode 2 : Netlify CMS](#methode-2-netlify-cms)
5. [Méthode 3 : Hugo CLI](#methode-3-hugo-cli)
6. [Structure des articles](#structure-des-articles)
7. [Taxonomies et métadonnées](#taxonomies-et-metadonnees)
8. [Bonnes pratiques](#bonnes-pratiques)
9. [Résolution de problèmes](#resolution-de-problemes)

---

## 1. Introduction

Ce guide vous explique comment créer des articles pour le site web de l'association Leidimen. Trois méthodes sont disponibles selon votre niveau technique et vos besoins.

### Pourquoi plusieurs méthodes ?

- **Interface Web CMS** : Pour développeurs qui veulent une interface moderne et rapide
- **Netlify CMS** : Pour éditeurs non-techniques avec interface graphique complète
- **Hugo CLI** : Pour développeurs experts qui préfèrent la ligne de commande

---

## 2. Choix de la méthode

| Critère              | Interface Web CMS      | Netlify CMS      | Hugo CLI         |
| -------------------- | ---------------------- | ---------------- | ---------------- |
| **Niveau technique** | Développeur            | Débutant         | Expert           |
| **Installation**     | Node.js + Token GitHub | Navigateur       | Hugo installé    |
| **Interface**        | Web moderne            | Web intuitive    | Terminal         |
| **Upload images**    | Manuelle               | Drag & drop      | Manuelle         |
| **Prévisualisation** | Markdown en temps réel | WYSIWYG          | Via serveur Hugo |
| **Validation**       | Formulaire + stats     | Formulaire       | Manuelle         |
| **Commit**           | API GitHub directe     | Netlify Identity | Git manuel       |
| **Vitesse**          | ⚡⚡⚡                 | ⚡⚡             | ⚡⚡⚡           |

**Recommandation :**

- Éditeurs de contenu → **Netlify CMS**
- Développeurs réguliers → **Interface Web CMS**
- Développeurs experts → **Hugo CLI**

---

## 3. Méthode 1 : Interface Web CMS

### 🚀 Démarrage rapide

```bash
cd cms-web
./start.sh
# Puis ouvrir : http://localhost:3000
```

### Configuration initiale

1. **Générer un token GitHub**
   - Aller sur https://github.com/settings/tokens
   - Créer un token avec permission `repo`
   - Conserver le token en lieu sûr

2. **Configurer le token**
   ```bash
   cd cms-web
   ./configure-token.sh
   # Coller votre token quand demandé
   ```

### Utilisation

1. Accéder à http://localhost:3000
2. Remplir le formulaire :
   - **Titre** : Titre accrocheur
   - **Description** : 150-160 caractères pour SEO
   - **Contenu** : Markdown avec prévisualisation en temps réel
   - **Villages** : Sélection multiple (dorool, diona, etc.)
   - **Catégories** : Éducation, Santé, Infrastructure, etc.
   - **Tags** : Mots-clés pertinents
   - **Moods** : Émotion de l'article (heureux, inspiré, etc.)
   - **Image** : Chemin vers l'image de couverture
3. Cliquer sur **Créer l'article**
4. Le commit est automatique sur GitHub

### Fonctionnalités

- ✅ Validation des champs en temps réel
- ✅ Statistiques Markdown (mots, caractères, temps de lecture)
- ✅ Prévisualisation Markdown
- ✅ Liste des 5 derniers articles créés
- ✅ Design moderne avec animations
- ✅ Commit direct sur GitHub via API

📖 **Documentation complète** : [cms-web/README.md](cms-web/README.md)

---

## 4. Méthode 2 : Netlify CMS

### 🌐 Accès

**En local :**

```bash
npm run dev
# Puis ouvrir : http://localhost:1313/leidimen/admin/
```

**En production :**

```
https://hdicko.github.io/leidimen/admin/
```

### Prérequis

#### Pour le développement local

1. **Serveur Hugo démarré** (`npm run dev`)
2. **Serveur Netlify CMS Proxy démarré** (`npx netlify-cms-proxy-server`)

#### Pour la production

- Authentification via Netlify Identity (configurée automatiquement)

### Création d'un article étape par étape

#### Étape 1 : Connexion

1. Ouvrir l'interface Netlify CMS
2. Se connecter avec Netlify Identity (production) ou mode local

#### Étape 2 : Nouveau contenu

1. Cliquer sur **"New Post"** ou **"Nouvelle publication"**
2. Sélectionner **"Posts"** dans la collection

#### Étape 3 : Champs obligatoires

**Titre** (required)

```
Exemple : "Inauguration de l'école de Dorool"
```

- Accrocheur et descriptif
- 50-70 caractères recommandés
- Sans emojis ni caractères spéciaux

**Date** (required)

```
Format : 2025-10-22
```

- Date de publication
- Format YYYY-MM-DD
- Par défaut : aujourd'hui

**Description** (required)

```
Exemple : "L'école de Dorool a été inaugurée en présence des villageois et partenaires. Un moment historique pour l'éducation dans la région."
```

- 150-160 caractères (optimal SEO)
- Résumé concis et attractif
- Utilisé pour les réseaux sociaux

**Contenu** (required)

```markdown
## 📋 Résumé

Résumé de l'article en 2-3 phrases.

## 📝 Contexte

Présentation du contexte et des enjeux.

## 🎯 Actions entreprises

Description des actions et projets.

## 📊 Résultats

Résultats obtenus et impact.

## 💡 Perspectives

Prochaines étapes et développements futurs.
```

#### Étape 4 : Métadonnées et taxonomies

**Villages** (required)

```yaml
villages:
  - dorool
  - diona
```

- Villages concernés par l'article
- **IMPORTANT** : Utiliser les noms en minuscules
- Liste disponible : dorool, diona, debere, diambana, darawal, tanal, manko, tacouti, n'dumpa, douentza

**Catégories** (optional)

```yaml
categories:
  - Éducation
  - Santé
  - Infrastructure
  - Développement
```

- Catégories principales du projet
- 1-3 catégories recommandées

**Tags** (optional)

```yaml
tags:
  - école
  - formation
  - jeunesse
  - éducation
```

- Mots-clés pour le référencement
- 3-7 tags recommandés
- En minuscules

**Moods** (optional)

```yaml
moods:
  - heureux
  - inspiré
  - reconnaissant
```

- Ton émotionnel de l'article
- Choix : heureux, triste, inspiré, motivé, reconnaissant

**Image** (optional)

```yaml
image: "/images/uploads/inauguration-ecole-dorool.jpg"
```

- Image de couverture
- Upload via Netlify CMS ou chemin manuel
- Format : JPEG/PNG/WebP
- Dimensions recommandées : 1200x630px

**Draft** (optional)

```yaml
draft: false
```

- `false` : Article publié
- `true` : Brouillon (non visible sur le site)

#### Étape 5 : Prévisualisation

1. Cliquer sur l'icône **👁️ Preview** en haut à droite
2. Vérifier le rendu final
3. Corriger si nécessaire

#### Étape 6 : Publication

1. Cliquer sur **"Publish"** ou **"Publier"**
2. Choisir :
   - **Publish now** : Publication immédiate
   - **Save as draft** : Sauvegarder en brouillon
3. Confirmer la publication

Le CMS crée automatiquement :

- Le fichier Markdown dans `content/posts/YYYY/`
- Le commit Git avec message descriptif
- Le push vers GitHub
- Le déploiement automatique (si configuré)

### Fonctionnalités avancées

#### Upload d'images

1. Dans le champ **Image**, cliquer sur **"Choose an image"**
2. Glisser-déposer l'image ou cliquer pour parcourir
3. L'image est uploadée dans `static/images/uploads/`
4. Le chemin est automatiquement inséré

#### Édition d'un article existant

1. Dans le CMS, cliquer sur **"Posts"**
2. Sélectionner l'article à modifier
3. Éditer les champs
4. Cliquer sur **"Publish"** pour sauvegarder

#### Suppression d'un article

1. Ouvrir l'article dans le CMS
2. Cliquer sur **"Delete"** dans le menu
3. Confirmer la suppression

📖 **Documentation complète** : [NETLIFY_CMS_GUIDE.md](NETLIFY_CMS_GUIDE.md)

---

## 5. Méthode 3 : Hugo CLI

### 🖥️ Utilisation en ligne de commande

```bash
# Créer un nouveau post
hugo new posts/2025/mon-article.md

# Éditer le fichier
nano content/posts/2025/mon-article.md

# Lancer le serveur de développement
./dev-server.sh

# Build pour production
npm run build

# Déployer
./deploy.sh
```

### Structure d'un post

Les posts sont organisés **par année** dans `content/posts/`:

```
content/posts/
├── 2024/
│   ├── article-2024.md
│   └── gallery-2024/
│       ├── index.md
│       ├── photo1.jpg
│       └── photo2.jpg
└── 2025/
    ├── article-2025.md
    └── mon-article.md
```

**Convention importante :**

- ✅ Nouveaux posts dans `content/posts/YYYY/`
- ✅ Bundles avec images : `content/posts/YYYY/mon-article/index.md`
- ❌ Éviter : posts à la racine de `content/posts/`

### Archetype utilisé

Le fichier `archetypes/post.md` définit le template par défaut :

```yaml
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
villages: []
categories: []
tags: []
moods: []
description: ""
image: ""
draft: true
---

## 📋 Résumé

[Résumé en 2-3 phrases]

## 📝 Contexte

[Présentation du contexte]

## 🎯 Actions entreprises

[Description des actions]

## 📊 Résultats

[Résultats et impact]

## 💡 Perspectives

[Prochaines étapes]
```

### Exemple complet

```markdown
---
title: "Construction du puits de Darawal"
date: 2025-01-15
villages: ["darawal"]
categories: ["Infrastructure", "Développement"]
tags: ["eau", "puits", "hydraulique", "développement"]
moods: ["heureux", "reconnaissant"]
description: "Inauguration du nouveau puits de Darawal qui améliore l'accès à l'eau potable pour 500 habitants."
image: "/images/uploads/puits-darawal-2025.jpg"
draft: false
---

## 📋 Résumé

Le nouveau puits de Darawal a été inauguré le 15 janvier 2025 après 3 mois de travaux. Il améliore considérablement l'accès à l'eau potable pour 500 habitants du village.

## 📝 Contexte

Le village de Darawal souffrait d'un accès limité à l'eau potable. Les habitants devaient parcourir plusieurs kilomètres pour s'approvisionner.

## 🎯 Actions entreprises

- Étude hydrogéologique préalable
- Forage à 45 mètres de profondeur
- Installation d'une pompe manuelle
- Formation de 10 villageois à la maintenance

## 📊 Résultats

- 500 personnes bénéficient du nouveau puits
- Distance moyenne réduite de 3 km à 200 m
- Qualité de l'eau conforme aux normes OMS
- Économie de 2h par jour pour les familles

## 💡 Perspectives

Construction de 2 autres puits dans les villages voisins prévue pour 2026.
```

---

## 6. Structure des articles

### Organisation des fichiers

#### Post simple (texte uniquement)

```
content/posts/2025/mon-article.md
```

#### Post avec images (bundle)

```
content/posts/2025/mon-article/
├── index.md          ← Le contenu de l'article
├── photo1.jpg        ← Images en tant que Page Resources
├── photo2.jpg
└── cover.jpg
```

**Avantages des bundles :**

- Images traitées par Hugo (optimisation WebP)
- Chemins relatifs simples
- Galeries PhotoSwipe automatiques
- Meilleure organisation

### Frontmatter complet

```yaml
---
# === MÉTADONNÉES PRINCIPALES ===
title: "Titre accrocheur et descriptif"
date: 2025-01-15
lastmod: 2025-01-16 # Optionnel : date de dernière modification
author: "Leidimen" # Optionnel : auteur (défaut: Leidimen)
draft: false # false = publié, true = brouillon

# === SEO & PARTAGE ===
description: "Description de 150-160 caractères pour le référencement et le partage sur les réseaux sociaux."
image: "/images/uploads/cover.jpg" # Image de couverture
keywords: ["mot1", "mot2"] # Optionnel : mots-clés supplémentaires

# === TAXONOMIES ===
villages: ["dorool", "diona"] # IMPORTANT : minuscules
categories: ["Éducation", "Santé"]
tags: ["école", "formation", "jeunesse"]
moods: ["heureux", "inspiré"]

# === MÉTADONNÉES AVANCÉES ===
weight: 1 # Optionnel : ordre d'affichage
featured: true # Optionnel : article mis en avant
---
```

---

## 7. Taxonomies et métadonnées

### Villages (taxonomy)

**Liste complète des villages** (à utiliser en minuscules) :

| Village    | Usage                    | Localisation        |
| ---------- | ------------------------ | ------------------- |
| `dorool`   | `villages: ["dorool"]`   | Commune de Douentza |
| `diona`    | `villages: ["diona"]`    | Commune de Douentza |
| `debere`   | `villages: ["debere"]`   | Commune de Douentza |
| `diambana` | `villages: ["diambana"]` | Commune de Douentza |
| `darawal`  | `villages: ["darawal"]`  | Commune de Douentza |
| `tanal`    | `villages: ["tanal"]`    | Commune de Douentza |
| `manko`    | `villages: ["manko"]`    | Commune de Douentza |
| `tacouti`  | `villages: ["tacouti"]`  | Commune de Douentza |
| `n'dumpa`  | `villages: ["n'dumpa"]`  | Commune de Douentza |
| `douentza` | `villages: ["douentza"]` | Chef-lieu de cercle |

**Données centralisées** : Les coordonnées GPS, populations et projets sont dans `data/villages/mali_villages.yaml`.

### Catégories (taxonomy)

```yaml
categories:
  - Éducation # Projets scolaires, formation
  - Santé # Santé, hygiène, nutrition
  - Infrastructure # Construction, eau, électricité
  - Développement # Agriculture, économie, social
  - Culture # Traditions, événements culturels
```

### Tags (taxonomy)

Exemples de tags pertinents :

```yaml
tags:
  # Éducation
  - école
  - formation
  - enseignement
  - étudiants
  - jeunesse

  # Santé
  - santé
  - hygiène
  - nutrition
  - soins

  # Infrastructure
  - eau
  - puits
  - construction
  - électricité

  # Social
  - femmes
  - jeunesse
  - communauté
  - solidarité
```

### Moods (taxonomy)

Ton émotionnel de l'article :

```yaml
moods:
  - heureux # Célébration, réussite
  - triste # Difficulté, obstacle
  - inspiré # Histoire inspirante
  - motivé # Appel à l'action
  - reconnaissant # Remerciements
```

---

## 8. Bonnes pratiques

### Rédaction

1. **Titre**
   - 50-70 caractères
   - Accrocheur et descriptif
   - Pas d'emojis (sauf si adapté)
   - Exemple : ❌ "Projet 2025" → ✅ "Inauguration de l'école de Dorool - Un espoir pour 300 enfants"

2. **Description (SEO)**
   - 150-160 caractères exactement
   - Inclure mot-clé principal
   - Attractif pour inciter au clic
   - Pas de ponctuation finale

3. **Contenu**
   - Structure claire avec titres `## H2` et `### H3`
   - Paragraphes courts (3-5 lignes)
   - Utiliser des listes à puces
   - Inclure des chiffres et statistiques
   - Ajouter des images pertinentes

4. **Images**
   - Format : JPEG (photos), PNG (logos/texte), WebP (optimal)
   - Dimensions : 1200x630px (idéal pour réseaux sociaux)
   - Poids : < 500 KB par image
   - Nommage : descriptif et sans espaces (`ecole-dorool-2025.jpg`)
   - Toujours inclure attribut `alt` pour accessibilité

### SEO et référencement

1. **Description unique** : Chaque article doit avoir sa propre description
2. **Mots-clés pertinents** : Utiliser tags et catégories cohérents
3. **Images optimisées** : Compression et dimensions adaptées
4. **Structure sémantique** : Titres H2, H3 hiérarchisés
5. **Liens internes** : Référencer d'autres articles Leidimen

### Organisation

1. **Posts par année** : Toujours créer dans `content/posts/YYYY/`
2. **Bundles pour galeries** : Utiliser `index.md` + images dans même dossier
3. **Nommage des fichiers** : Minuscules avec tirets (`mon-article.md`)
4. **Taxonomies en minuscules** : Villages TOUJOURS en minuscules

### Markdown

**Syntaxe de base** :

```markdown
## Titre niveau 2

### Titre niveau 3

**Texte en gras**
_Texte en italique_

- Liste à puces
- Deuxième élément

1. Liste numérotée
2. Deuxième élément

[Lien vers site](https://leidimen.com)

![Description image](/images/photo.jpg)
```

**Shortcodes Hugo disponibles** :

```markdown
{{< gallery >}}
{{< youtube id="VIDEO_ID" >}}
{{< alert type="info" >}}Message important{{< /alert >}}
{{< figure src="/images/photo.jpg" title="Légende" >}}
{{< icon name="heart" >}}
```

📖 [Liste complète des 24 shortcodes](../layouts/shortcodes/)

---

## 9. Résolution de problèmes

### Erreur : "Village not found"

**Cause** : Village en majuscule ou mal orthographié

**Solution** :

```yaml
# ❌ Incorrect
villages: ["Dorool", "DIONA"]

# ✅ Correct
villages: ["dorool", "diona"]
```

### Erreur : "Image not found"

**Cause** : Chemin d'image incorrect

**Solutions** :

1. Vérifier que l'image existe dans `static/images/uploads/`
2. Utiliser chemin absolu : `/images/uploads/photo.jpg`
3. Pour bundles, utiliser chemin relatif : `photo.jpg`

### Erreur : "Failed to build"

**Cause** : Erreur de syntaxe Markdown ou frontmatter

**Solution** :

1. Vérifier le YAML frontmatter (indentation, quotes)
2. Vérifier les shortcodes (tags ouverts/fermés)
3. Consulter les logs : `npm run build`

### Article non visible sur le site

**Causes possibles** :

1. `draft: true` → Changer en `draft: false`
2. Date future → Utiliser date passée ou présente
3. Fichier mal placé → Vérifier chemin `content/posts/YYYY/`

### Images ne s'affichent pas dans galerie

**Cause** : Images non en tant que Page Resources

**Solution** :

```
# ❌ Incorrect
content/posts/2025/article.md
static/images/photo1.jpg

# ✅ Correct (bundle)
content/posts/2025/article/
├── index.md
├── photo1.jpg
└── photo2.jpg
```

### Netlify CMS : Impossible de se connecter

**Solutions** :

1. **Local** : Vérifier que `npx netlify-cms-proxy-server` est démarré
2. **Production** : Vérifier Netlify Identity configuré
3. Vider le cache du navigateur
4. Tester en mode navigation privée

### Interface Web CMS : Erreur "GitHub API rate limit"

**Cause** : Trop de requêtes à l'API GitHub

**Solution** :

1. Attendre 1 heure (reset automatique)
2. Utiliser un token avec meilleurs quotas
3. Utiliser Netlify CMS temporairement

---

## Annexes

### Ressources utiles

- [Markdown Guide](https://www.markdownguide.org/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [PhotoSwipe Documentation](https://photoswipe.com/)

### Contacts

- **Email** : association@leidimen.com
- **GitHub** : https://github.com/hdicko/leidimen
- **Site** : https://hdicko.github.io/leidimen/

### Templates et exemples

Consulter les exemples dans :

- `content/posts/2024/` - Articles 2024
- `content/posts/2025/` - Articles 2025
- `content/galleries/` - Galeries photos

---

**Créé** : Janvier 2026  
**Dernière mise à jour** : Janvier 2026  
**Version** : 2.0  
**Status** : ✅ Guide unifié et complet
