# Quick Reference: Créer un Article avec Netlify CMS

## 🚀 Accès rapide

**Local:** http://localhost:1313/leidimen/admin/  
**Production:** https://hdicko.github.io/leidimen/admin/

---

## ✅ Checklist pour un nouvel article

### Obligatoire
- [ ] **Titre** - Clair et descriptif (max 60 caractères)
- [ ] **Date** - Date de publication
- [ ] **Contenu** - Corps de l'article en Markdown

### Recommandé
- [ ] **Description** - 150-160 caractères pour SEO
- [ ] **Image** - Image de couverture (1200x630px, max 2MB)
- [ ] **Villages** - Sélectionner les villages concernés
- [ ] **Catégories** - Ex: Éducation, Santé, Infrastructure
- [ ] **Tags** - Mots-clés pour la recherche

### Optionnel
- [ ] **Auteur** - Par défaut "Leidimen"
- [ ] **Moods** - Humeur de l'article
- [ ] **Brouillon** - Cocher pour masquer du site

---

## 📝 Template d'article minimal

```markdown
---
title: "Votre titre ici"
date: 2025-10-10
description: "Description courte pour SEO (150-160 caractères)"
image: "/images/uploads/votre-image.jpg"
villages:
  - dorool
categories:
  - Éducation
tags:
  - école
  - projet
---

## Introduction

Votre introduction ici...

## Point principal

Développement...

## Conclusion

Résumé et perspectives...
```

---

## 🎨 Formatage Markdown rapide

| Syntaxe | Résultat |
|---------|----------|
| `**gras**` | **gras** |
| `*italique*` | *italique* |
| `[lien](url)` | lien cliquable |
| `![alt](/img.jpg)` | image |
| `## Titre` | Titre niveau 2 |
| `- item` | Liste à puces |
| `1. item` | Liste numérotée |
| `> citation` | Citation en bloc |

---

## 🏷️ Villages disponibles

- Darawal
- Debere
- Diambana
- Diona
- Dorool
- Douentza
- Manko
- N'Dumpa
- Tacouti
- Tanal

---

## 🎭 Moods disponibles

- Heureux
- Triste
- Inspiré
- Motivé
- Reconnaissant

---

## 📊 Catégories suggérées

- Éducation
- Santé
- Infrastructure
- Développement
- Événement
- Témoignage
- Rapport

---

## 🖼️ Images - Bonnes pratiques

**Format:** JPG ou PNG  
**Taille:** Max 2 MB  
**Dimensions:** 1200x630 px (optimal pour partage social)  
**Nommage:** descriptif-kebab-case.jpg

**Exemple:** `dorool-ecole-rentree-2025.jpg`

---

## 🔄 Workflow

1. **Créer** - Cliquer sur "Nouvel Article"
2. **Rédiger** - Remplir tous les champs
3. **Prévisualiser** - Vérifier le rendu
4. **Sauvegarder** - Mode brouillon
5. **Publier** - Rendre visible

---

## ⚡ Raccourcis

| Action | Raccourci |
|--------|-----------|
| Sauvegarder | Ctrl+S (Cmd+S) |
| Gras | Ctrl+B (Cmd+B) |
| Italique | Ctrl+I (Cmd+I) |
| Lien | Ctrl+K (Cmd+K) |

---

## 🆘 En cas de problème

1. Rafraîchir la page (Ctrl+F5)
2. Vider le cache du navigateur
3. Vérifier que Hugo est démarré
4. Vérifier que le proxy CMS est actif

**Support:** association@leidimen.com

---

**Guide complet:** Voir `NETLIFY_CMS_GUIDE.md`
