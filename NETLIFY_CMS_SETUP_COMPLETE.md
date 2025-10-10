# ✅ Netlify CMS - Configuration Complète

## 🎉 Installation réussie !

Netlify CMS est maintenant configuré pour le site Leidimen. Vous pouvez gérer facilement tous vos contenus via une interface intuitive.

---

## 🚀 Démarrage rapide

### 1. Démarrer les serveurs (en développement local)

**Terminal 1 - Proxy Netlify CMS:**
```bash
npx netlify-cms-proxy-server
```

**Terminal 2 - Hugo:**
```bash
hugo server -D
# ou utilisez votre script
./dev-server.sh
```

### 2. Accéder à l'interface d'administration

Ouvrir dans votre navigateur:
- **Local:** http://localhost:1313/leidimen/admin/
- **Production:** https://hdicko.github.io/leidimen/admin/ (après déploiement)

---

## 📝 Comment créer un nouvel article

### Méthode 1: Via Netlify CMS (Recommandée)

1. Accéder à http://localhost:1313/leidimen/admin/
2. Cliquer sur **"📝 Articles"** dans le menu
3. Cliquer sur **"New Article"**
4. Remplir le formulaire:

**Champs obligatoires:**
- **Titre:** Le titre de votre article
- **Date de publication:** Sélectionner la date
- **Contenu:** Rédiger l'article en Markdown

**Champs recommandés:**
- **Description courte:** Pour le SEO (150-160 caractères)
- **Image principale:** Télécharger une image (max 2MB)
- **Villages concernés:** Sélectionner dans la liste
- **Catégories:** Ex: Éducation, Santé, Infrastructure
- **Tags:** Mots-clés pour faciliter la recherche

5. Cliquer sur **"Save"** (brouillon) ou **"Publish"** (publier)

### Méthode 2: Manuellement (Avancée)

Créer un fichier dans `content/posts/` avec cette structure:

```markdown
---
title: "Titre de votre article"
date: 2025-10-10
author: "Leidimen"
description: "Description courte pour le SEO"
image: "/images/uploads/article-image.jpg"
villages:
  - dorool
  - darawal
moods:
  - heureux
categories:
  - Éducation
tags:
  - école
  - projet
draft: false
---

## Introduction

Votre contenu ici...

## Développement

Plus de détails...

## Conclusion

Résumé et perspectives...
```

---

## 🗂️ Structure harmonisée des articles

### Template complet standardisé

```markdown
---
# === MÉTADONNÉES PRINCIPALES ===
title: "Titre accrocheur et descriptif"
date: 2025-10-10
lastmod: 2025-10-10
author: "Leidimen"
draft: false

# === SEO & PARTAGE ===
description: "Description concise de 150-160 caractères pour le référencement et le partage sur les réseaux sociaux."
image: "/images/uploads/nom-descriptif.jpg"

# === TAXONOMIES ===
villages:
  - dorool
  - darawal
moods:
  - heureux
  - inspire
categories:
  - Éducation
  - Développement
tags:
  - école
  - formation
  - jeunesse
---

## 📋 Résumé

Paragraphe d'introduction qui résume l'article en 2-3 phrases et capte l'attention du lecteur.

## 🎯 Contexte

Expliquer le contexte et pourquoi ce sujet est important pour Leidimen et les communautés concernées.

## 📖 Développement

### Point clé 1

Développement détaillé du premier aspect avec:
- Des faits concrets
- Des chiffres si disponibles
- Des témoignages

### Point clé 2

Deuxième aspect important avec exemples et illustrations.

### Point clé 3

Troisième élément avec des détails pertinents.

## 🌟 Témoignages / Citations

> « Citation d'un membre de la communauté ou d'un bénéficiaire »  
> — Nom de la personne, Fonction

## 📊 Résultats / Impact

Présenter les résultats obtenus ou attendus:
- Impact quantitatif (nombres, statistiques)
- Impact qualitatif (améliorations, changements)
- Bénéficiaires directs et indirects

## 🔮 Perspectives

Projets futurs, prochaines étapes, ou comment contribuer.

## 💡 Pour aller plus loin

- [Lien vers article connexe 1](#)
- [Lien vers article connexe 2](#)
- [Galerie photos associée](/leidimen/galleries/nom-galerie/)

---

**📅 Date de publication:** 10 octobre 2025  
**✍️ Auteur:** Nom de l'auteur  
**📍 Villages concernés:** Dorool, Darawal  
**🏷️ Tags:** #école #éducation #mali

**📞 Contact:** Pour plus d'informations ou pour soutenir ce projet, contactez-nous à association@leidimen.com
```

---

## 🎨 Éléments de contenu disponibles

### Titres et sections
```markdown
## Titre niveau 2
### Titre niveau 3
#### Titre niveau 4
```

### Mise en forme du texte
```markdown
**Texte en gras**
*Texte en italique*
***Texte gras et italique***
~~Texte barré~~
```

### Listes
```markdown
- Liste à puces
- Item 2
  - Sous-item

1. Liste numérotée
2. Item 2
```

### Liens et images
```markdown
[Texte du lien](https://example.com)
![Texte alternatif de l'image](/images/photo.jpg)
```

### Citations
```markdown
> Citation importante
> Sur plusieurs lignes
```

### Tableaux
```markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1  | Donnée 2  | Donnée 3  |
| Donnée 4  | Donnée 5  | Donnée 6  |
```

### Shortcodes Hugo disponibles
```markdown
{{< figure src="/images/photo.jpg" title="Légende" >}}

{{< youtube VIDEO_ID >}}

{{< highlight python >}}
# Code avec coloration syntaxique
def hello():
    print("Hello!")
{{< /highlight >}}
```

---

## 📁 Collections disponibles dans Netlify CMS

### 1. 📝 Articles (Posts)
- Articles de blog, actualités, rapports d'activité
- Support complet des taxonomies (villages, moods, catégories, tags)
- Gestion des images et médias

### 2. 👥 Équipe (Team Members)
- Profils des membres du bureau et adhérents
- Photos, fonctions, coordonnées
- Spécialités et biographies

### 3. 🏘️ Villages
- Informations sur chaque village
- Population, coordonnées GPS
- Projets en cours

### 4. 📄 Documents
- Rapports, politiques, formulaires
- Téléchargement de PDF
- Types: Rapport, Statuts, Adhésion, etc.

### 5. 📸 Galeries
- Albums photos d'événements
- Légendes et crédits photo
- Géolocalisation

---

## 🎯 Bonnes pratiques

### Pour les titres
✅ **Bon:** "Inauguration de la nouvelle école de Dorool - Octobre 2025"  
❌ **À éviter:** "nouvelle école"

### Pour les descriptions
✅ **Bon:** "L'école de Dorool accueille 150 élèves dans ses nouvelles classes équipées grâce au soutien de Leidimen et de ses donateurs."  
❌ **À éviter:** "Une école."

### Pour les images
- **Format:** JPG (photos), PNG (graphiques/logos)
- **Taille:** Max 2 MB, optimisées pour le web
- **Dimensions:** 1200x630px pour partage social optimal
- **Nommage:** `village-projet-date.jpg` (ex: `dorool-ecole-2025.jpg`)
- **Texte alt:** Description pour accessibilité

### Pour le contenu
- Paragraphes courts (3-4 lignes max)
- Sous-titres pour structurer
- Listes pour la lisibilité
- Liens internes vers autres articles/pages
- Citations pour humaniser le contenu
- Chiffres et données concrètes

### Pour le SEO
- Titre unique et descriptif
- Description meta de 150-160 caractères
- URL propre (slug automatique)
- Mots-clés dans le titre et premier paragraphe
- Images avec texte alt descriptif
- Liens internes et externes pertinents

---

## 🔧 Configuration des fichiers

### Structure des dossiers

```
content/
├── posts/                    # Articles (via CMS)
├── about/                    # Membres équipe (via CMS)
├── villages/                 # Villages (via CMS)
├── documents/                # Documents (via CMS)
└── galleries/                # Galeries (via CMS)

static/
└── images/
    └── uploads/              # Images téléchargées via CMS
        ├── articles/
        ├── team/
        ├── villages/
        └── galleries/

static/admin/
├── index.html                # Interface Netlify CMS
└── config.yml                # Configuration collections
```

### Configuration actuelle (config.yml)

Le fichier `static/admin/config.yml` contient:
- ✅ Backend Git Gateway configuré
- ✅ Local backend activé pour développement
- ✅ Médias dans `static/images/uploads/`
- ✅ 5 collections configurées et prêtes
- ✅ Champs personnalisés avec hints
- ✅ Validation et valeurs par défaut

---

## 🚀 Workflow de publication

```
┌─────────────┐
│   Créer     │  Ouvrir Netlify CMS admin
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Rédiger    │  Remplir tous les champs du formulaire
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Sauvegarder │  Save = Brouillon (draft: true)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Réviser   │  Relire, corriger, améliorer
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Publier    │  Publish = Visible sur le site
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Commit    │  Git commit automatique
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Déployer   │  GitHub Actions → GitHub Pages
└─────────────┘
```

---

## 📚 Documentation complète

- **Guide complet:** Voir `NETLIFY_CMS_GUIDE.md`
- **Référence rapide:** Voir `QUICK_REFERENCE.md`
- **Documentation Hugo:** https://gohugo.io/documentation/
- **Documentation Netlify CMS:** https://www.netlifycms.org/docs/

---

## 🆘 Support et dépannage

### Problèmes courants

**1. L'admin ne se charge pas**
```bash
# Vérifier que les serveurs sont démarrés
ps aux | grep hugo
ps aux | grep netlify-cms-proxy

# Redémarrer si nécessaire
npx netlify-cms-proxy-server
hugo server -D
```

**2. Impossible de sauvegarder**
- Vérifier les permissions Git
- Vérifier la connexion internet
- Consulter la console navigateur (F12)

**3. Images ne s'affichent pas**
- Vérifier le chemin: `/images/uploads/nom-fichier.jpg`
- Vérifier que l'image existe dans `static/images/uploads/`
- Format supporté: JPG, PNG, GIF

**4. Les modifications ne sont pas visibles**
- Attendre quelques secondes (rebuild auto)
- Rafraîchir: Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)
- Vérifier que `draft: false`

### Contact

**Email:** association@leidimen.com  
**Repository:** https://github.com/hdicko/leidimen

---

## ✅ Checklist de vérification

Avant de publier un article, vérifier:

- [ ] Titre clair et accrocheur
- [ ] Date correcte
- [ ] Description SEO (150-160 caractères)
- [ ] Image principale (optimisée, < 2MB)
- [ ] Villages concernés sélectionnés
- [ ] Catégories appropriées
- [ ] Tags pertinents
- [ ] Contenu relu et corrigé
- [ ] Liens fonctionnels
- [ ] Images avec texte alt
- [ ] Format Markdown correct
- [ ] `draft: false` pour publier

---

**Date de configuration:** 10 octobre 2025  
**Version Hugo:** 0.150.1  
**Version Netlify CMS:** 2.x

🎉 **Tout est prêt ! Vous pouvez maintenant créer votre premier article via l'interface d'administration.**
