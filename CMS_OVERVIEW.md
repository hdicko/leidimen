# 🎉 Leidimen CMS - Systèmes de Gestion de Contenu

Le projet Leidimen dispose maintenant de **3 systèmes** de gestion de contenu différents pour créer et publier des articles.

## 🆕 1. CMS Web Interface (Nouveau!)

**Interface web moderne créée sur mesure pour Leidimen**

### 📍 Emplacement

`cms-web/`

### ⚡ Démarrage rapide

```bash
cd cms-web
./start.sh
# Puis ouvrir : http://localhost:3000
```

### ✨ Fonctionnalités

- ✅ Interface graphique moderne avec Bootstrap 5
- ✅ Formulaire interactif avec validation en temps réel
- ✅ Prévisualisation Markdown
- ✅ Commit automatique sur GitHub
- ✅ Statistiques du site (posts, membres, villages)
- ✅ Liste des posts récents
- ✅ Design responsive et animations CSS
- 🚧 Upload d'images (à venir)
- 🚧 Création de galeries (à venir)

### 📖 Documentation

- **Guide rapide** : [cms-web/QUICKSTART.md](cms-web/QUICKSTART.md)
- **Documentation complète** : [cms-web/README.md](cms-web/README.md)
- **Résumé** : [cms-web/SUMMARY.md](cms-web/SUMMARY.md)
- **Intégration** : [cms-web/INTEGRATION.md](cms-web/INTEGRATION.md)

### 🎯 Idéal pour

- ✅ Développeurs avec Node.js installé
- ✅ Création rapide de posts avec validation
- ✅ Besoin de prévisualisation
- ✅ Utilisation en local

---

## 🔧 2. CLI Python (Terminal)

**Script en ligne de commande interactif**

### 📍 Emplacement

- `leidimen-cms` (wrapper bash)
- `leidimen-cms.py` (script Python)

### ⚡ Utilisation

```bash
./leidimen-cms create
```

### ✨ Fonctionnalités

- ✅ Questions interactives dans le terminal
- ✅ Génération automatique du Markdown
- ✅ Commit et push automatique
- ✅ Rapide et léger
- ✅ Pas besoin de navigateur

### 📖 Documentation

- [LEIDIMEN_CMS_GUIDE.md](LEIDIMEN_CMS_GUIDE.md)
- [README_CMS.md](README_CMS.md)

### 🎯 Idéal pour

- ✅ Développeurs qui aiment le terminal
- ✅ Création rapide sans interface graphique
- ✅ Scripts automatisés
- ✅ Environnements sans interface graphique

---

## 🌐 3. Netlify CMS (Production)

**Interface web officielle avec authentification**

### 📍 Accès

- **Local** : http://localhost:1313/leidimen/admin/
- **Production** : https://hdicko.github.io/leidimen/admin/

### ✨ Fonctionnalités

- ✅ Interface graphique standard
- ✅ Authentification Netlify Identity
- ✅ Upload d'images par glisser-déposer
- ✅ Prévisualisation HTML
- ✅ Accessible en ligne
- ✅ Multi-utilisateurs

### 📖 Documentation

- [NETLIFY_CMS_GUIDE.md](NETLIFY_CMS_GUIDE.md)
- Configuration : [static/admin/config.yml](static/admin/config.yml)

### 🎯 Idéal pour

- ✅ Utilisateurs non-techniques
- ✅ Contributeurs externes
- ✅ Upload d'images facile
- ✅ Accès depuis n'importe où

---

## 📊 Comparaison des 3 systèmes

| Critère | CMS Web 🆕 | CLI Python | Netlify CMS |
|---------|------------|------------|-------------|
| **Interface** | Web moderne | Terminal | Web standard |
| **Installation** | npm install | Prêt à l'emploi | Déjà intégré |
| **Authentification** | 🚧 À ajouter | Locale | ✅ Netlify Identity |
| **Accessible en ligne** | ❌ Local | ❌ Local | ✅ Oui |
| **Upload images** | 🚧 À venir | ❌ Non | ✅ Oui |
| **Prévisualisation** | ✅ Markdown | ✅ Markdown | ✅ HTML |
| **Commit auto** | ✅ Oui | ✅ Oui | ✅ Oui |
| **Statistiques** | ✅ Oui | ❌ Non | ❌ Non |
| **Personnalisation** | ✅ Total | ✅ Total | ⚠️ Limitée |
| **Difficulté** | ⭐⭐ Moyen | ⭐ Facile | ⭐ Facile |

---

## 💡 Quel système choisir ?

### 🆕 Utilisez le CMS Web si

- Vous êtes développeur avec Node.js
- Vous voulez une interface moderne et personnalisée
- Vous travaillez en local
- Vous voulez voir les statistiques du site
- Vous préférez une interface graphique moderne

### 🔧 Utilisez le CLI Python si

- Vous aimez le terminal
- Vous voulez créer des posts rapidement
- Vous n'avez pas besoin d'interface graphique
- Vous voulez scripter la création de posts

### 🌐 Utilisez Netlify CMS si

- Vous êtes non-technique
- Vous voulez uploader des images facilement
- Vous avez besoin d'accès depuis n'importe où
- Plusieurs personnes doivent contribuer
- Vous préférez une solution standard éprouvée

---

## 🚀 Guide de démarrage rapide

### Pour le CMS Web (Nouveau!)

```bash
# 1. Aller dans le dossier
cd cms-web

# 2. Installer (première fois seulement)
npm install

# 3. Configurer le token GitHub
cp .env.example .env
nano .env  # Ajouter GITHUB_TOKEN

# 4. Démarrer
npm start

# 5. Ouvrir dans le navigateur
# http://localhost:3000
```

### Pour le CLI Python

```bash
# Créer un nouveau post
./leidimen-cms create

# Ou directement
python3 leidimen-cms.py
```

### Pour Netlify CMS

```bash
# Démarrer Hugo en local
npm run dev

# Ouvrir dans le navigateur
# http://localhost:1313/leidimen/admin/
```

---

## 📚 Documentation générale

- **Guide de création de posts** : [GUIDE_CREATION_POST.md](GUIDE_CREATION_POST.md)
- **Quick reference** : [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Documentation du code** : [CODE_DOCUMENTATION.md](CODE_DOCUMENTATION.md)

---

## 🔄 Workflow recommandé

### Pour le développement quotidien

1. **CMS Web** pour créer des posts rapidement avec interface graphique
2. **CLI Python** pour les posts ultra-rapides en terminal
3. **VS Code** pour éditer des posts existants

### Pour les contributions externes

1. **Netlify CMS** pour permettre à d'autres de contribuer
2. **Pull Requests** pour review avant merge

### Pour les galeries photos

1. **Méthode manuelle** avec page bundle (voir GUIDE_CREATION_POST.md)
2. Shortcode `{{< gallery >}}` pour affichage automatique

---

## 🎉 Résumé

Le projet Leidimen dispose maintenant de **3 outils complémentaires** pour gérer le contenu :

1. 🆕 **CMS Web** - Interface moderne et personnalisée (nouveau!)
2. 🔧 **CLI Python** - Script terminal rapide et efficace
3. 🌐 **Netlify CMS** - Interface web standard avec authentification

**Choisissez l'outil qui correspond le mieux à votre workflow !**

---

**🏛️ Leidimen** - Association de Solidarité avec les villages de Douentza, Mali

*Créé le 4 novembre 2025*
