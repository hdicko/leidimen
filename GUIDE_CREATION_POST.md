# Guide de Création de Posts - Leidimen

## � NOUVEAU : Interface Web CMS (Recommandé pour développeurs)

**Une interface web moderne créée spécialement pour Leidimen !**

- ✅ Design moderne avec animations
- ✅ Formulaire interactif avec validation
- ✅ Prévisualisation Markdown
- ✅ Commit automatique sur GitHub
- ✅ Statistiques en temps réel
- ✅ Liste des posts récents

**Démarrage rapide :**

```bash
cd cms-web
./start.sh
# Puis ouvrir : http://localhost:3000
```

📖 **Documentation complète** : [cms-web/README.md](cms-web/README.md)

---

## 🎯 Méthode 1 : Netlify CMS (Pour non-techniques)

**Avantages :**

- Interface graphique intuitive
- Pas besoin de connaître Markdown ou Git
- Prévisualisation en temps réel
- Upload d'images par glisser-déposer
- Validation automatique des champs
- Commit et push automatiques

### Comment accéder

**En local :**

```bash
npm run dev
# Puis ouvrir : http://localhost:1313/leidimen/admin/
```

**En production :**

```text
https://hdicko.github.io/leidimen/admin/
```

### Étapes dans Netlify CMS

1. Cliquer sur "New Posts"
2. Remplir les champs :
   - **Title** : Titre de l'article
   - **Date** : Date de publication
   - **Villages** : Sélectionner un ou plusieurs villages (dorool, diona, etc.)
   - **Categories** : Éducation, Santé, Infrastructure, etc.
   - **Tags** : Mots-clés libres
   - **Moods** : Heureux, Triste, Inspiré, etc.
   - **Description** : Résumé SEO (150-160 caractères)
   - **Image** : Image de couverture (upload direct)
   - **Body** : Contenu de l'article en Markdown
3. Cliquer sur "Publish" → crée automatiquement le commit et push vers GitHub

---

## 📝 Méthode 3 : Hugo Archetype (Ligne de commande)

```bash
# Créer un nouveau post pour 2025
hugo new posts/2025/mon-nouvel-article.md

# Ou dans un sous-dossier thématique
hugo new posts/Hammadoun/mon-article.md
```

Cette commande utilise le template `archetypes/post.md` qui pré-remplit :

```yaml
---
title: "Mon Nouvel Article"
date: 2025-10-29
villages: []
categories: []
tags: []
moods: []
description: ""
image: ""
draft: true
---
```

### Ensuite

1. Éditer le fichier dans VS Code
2. Passer `draft: false` quand prêt
3. Ajouter les images dans `static/images/uploads/`
4. Commit et push manuellement :

   ```bash
   git add .
   git commit -m "feat: Add new post - Mon article"
   git push origin main
   ```

---

## 🖼️ Méthode 4 : Créer un post avec galerie photos

Pour un post avec plusieurs photos (page bundle) :

```bash
# Créer la structure
mkdir -p content/posts/2025/ma-galerie
cd content/posts/2025/ma-galerie

# Créer le fichier principal
hugo new posts/2025/ma-galerie/index.md

# Copier les images dans le même dossier
cp ~/Photos/*.jpg ./
```

### Structure finale

```text
content/posts/2025/ma-galerie/
├── index.md
├── photo1.jpg
├── photo2.jpg
└── photo3.jpg
```

### Dans `index.md`

```markdown
---
title: "Ma Galerie"
date: 2025-10-29
villages: ["dorool"]
categories: ["Éducation"]
tags: ["photos", "école"]
moods: ["heureux"]
description: "Description courte pour le SEO"
image: "photo1.jpg"
draft: false
---

Description de ma galerie...

{{< gallery >}}
```

**Important :**

- Les images DOIVENT être dans le même dossier que `index.md`
- Le shortcode `{{< gallery >}}` détecte automatiquement toutes les images
- Ne pas mettre les images dans un sous-dossier `photos/`

---

## 🔧 Comparaison des méthodes

| Méthode | Difficulté | Galerie Photos | Upload Images | Auto-commit | Interface |
|---------|------------|----------------|---------------|-------------|-----------|
| **CMS Web** 🆕 | ⭐ Facile | 🚧 Bientôt | 🚧 Bientôt | ✅ Oui | ✅ Moderne |
| **Netlify CMS** | ⭐ Facile | ❌ Non | ✅ Oui | ✅ Oui | ✅ Standard |
| **Hugo Archetype** | ⭐⭐ Moyen | ✅ Oui | ❌ Manuel | ❌ Manuel | ❌ Terminal |
| **Page Bundle** | ⭐⭐⭐ Avancé | ✅✅ Oui | ❌ Manuel | ❌ Manuel | ❌ Terminal |

---

## 💡 Recommandations

### Pour des développeurs avec Node.js

→ **Utilisez CMS Web** 🆕 - Interface moderne, validation, prévisualisation, commit auto

### Pour des articles simples (non-technique)

→ **Utilisez Netlify CMS** - Interface graphique, upload images, aucune commande

### Pour des posts avec beaucoup de photos

→ **Utilisez Page Bundle** (méthode 4) - Galeries automatiques avec PhotoSwipe

### Pour édition rapide en ligne de commande

→ **Utilisez Hugo Archetype** (méthode 3) - Rapide pour les développeurs

---

## 📋 Checklist avant publication

- [ ] Titre descriptif et accrocheur
- [ ] Date correcte
- [ ] Au moins un village sélectionné (en minuscules !)
- [ ] Catégorie appropriée
- [ ] Tags pertinents
- [ ] Mood correspondant au ton de l'article
- [ ] Description SEO (150-160 caractères)
- [ ] Image de couverture attractive
- [ ] `draft: false` pour publier
- [ ] Vérifier l'aperçu local avant de pusher

---

## 🛠️ Commandes utiles

```bash
# Démarrer le serveur local
npm run dev

# Créer un nouveau post
hugo new posts/2025/mon-article.md

# Vérifier les changements
git status

# Build le site
npm run build

# Déployer sur GitHub Pages
./deploy.sh
```

---

## ⚠️ Erreurs courantes à éviter

1. **Villages en majuscules** : Utiliser `["dorool"]` pas `["Dorool"]`
2. **Images dans sous-dossier** : Pour les galeries, images au même niveau que `index.md`
3. **Oublier `draft: false`** : L'article ne sera pas publié
4. **Image non uploadée** : Vérifier que le chemin d'image existe
5. **Date future** : Hugo peut ignorer les posts datés dans le futur

---

## 📚 Ressources supplémentaires

- **Netlify CMS Guide complet** : `NETLIFY_CMS_GUIDE.md`
- **Quick Reference** : `QUICK_REFERENCE.md`
- **Guide création article** : `GUIDE_CREATION_ARTICLE.md`
- **Documentation code** : `CODE_DOCUMENTATION.md`

---

## 🆘 Besoin d'aide ?

Si vous rencontrez un problème :

1. Vérifiez les erreurs dans le terminal avec `npm run dev`
2. Consultez les guides mentionnés ci-dessus
3. Vérifiez que Hugo 0.152.1 est bien installé : `hugo version`
4. Testez en local avant de pusher

---

## Dernière mise à jour

29 octobre 2025

