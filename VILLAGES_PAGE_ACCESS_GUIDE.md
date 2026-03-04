# 🗺️ Guide d'Accès - Page Villages

## URLs Correctes

### 🌐 Production (GitHub Pages)

```
https://hdicko.github.io/leidimen/villages/
```

### 💻 Développement Local

**Option 1 : Avec dev-server.sh (recommandé)**

```bash
./dev-server.sh
# Puis accéder à: http://localhost:1313/villages/
```

**Option 2 : Avec npm**

```bash
npm run dev
# Puis accéder à: http://localhost:1313/leidimen/villages/
```

**Option 3 : Hugo direct**

```bash
./node_modules/.bin/hugo/hugo server --baseURL="http://localhost:1313"
# Puis accéder à: http://localhost:1313/villages/
```

---

## ❌ Erreur 404 - Causes Communes

### Problème 1 : Mauvaise URL

**❌ INCORRECT (Production):**

```
https://hdicko.github.io/villages/  (manque /leidimen/)
http://localhost:1313/villages/     (si npm run dev - manque /leidimen/)
```

**✅ CORRECT:**

```
https://hdicko.github.io/leidimen/villages/
```

### Problème 2 : BaseURL pas override en dev

Si vous utilisez `npm run dev` au lieu de `./dev-server.sh`, le site garde le baseURL de production (`/leidimen/`).

**Solution:**

```bash
# Utiliser dev-server.sh qui override le baseURL
./dev-server.sh
```

---

## 🔍 Diagnostic

### Vérifier que la page est bien générée

```bash
# Build le site
npm run build

# Vérifier que le fichier existe
ls -la public/villages/index.html
```

**Résultat attendu:**

```
-rw-rw-r-- 1 dicko dicko 48104 Feb 25 20:58 public/villages/index.html
```

### Vérifier le contenu HTML

```bash
# Les premières lignes doivent contenir le DOCTYPE et le titre
head -100 public/villages/index.html | grep -i "villages de la région"
```

**Résultat attendu:**

```html
<title>Villages de la Région de Douentza - Nos Zones d'Intervention...</title>
```

---

## 📝 Structure de la Page Villages

### Fichiers Impliqués

```
content/villages/_index.md           # Contenu de la page
layouts/villages/list.html           # Template de rendu
data/villages/mali_villages.yaml     # Données des villages
public/villages/index.html           # Page générée
```

### Frontmatter du \_index.md

```yaml
---
date: "2023-08-19T22:35:25+02:00"
draft: false # ✅ Doit être false
title: "Villages de la Région de Douentza - Nos Zones d'Intervention"
description: "Découvrez les villages..."
keywords:
  - villages Mali
  - Douentza
---
```

---

## ✅ Page Validée

- ✅ Build successful (915 pages générées)
- ✅ `/villages/index.html` existe (48 Ko)
- ✅ HTML valide avec DOCTYPE
- ✅ Meta tags SEO présentes
- ✅ Données YAML chargées
- ✅ Layout villages/list.html appliqué

---

## 🚀 Déploiement

### Build de Production

```bash
npm run build
```

### Déploiement GitHub Pages

```bash
./deploy.sh
```

**Après déploiement, la page sera accessible à:**

```
https://hdicko.github.io/leidimen/villages/
```

---

## 📞 Support

Si le problème persiste :

1. Vérifier le port du serveur de développement
2. Vider le cache du navigateur (Ctrl+Shift+R)
3. Vérifier les logs du serveur Hugo
4. Tester en navigation privée

---

**Date de création:** February 25, 2026  
**Statut:** ✅ Page fonctionnelle et validée
