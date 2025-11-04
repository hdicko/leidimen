# Leidimen CMS - Interface Web

Une interface web moderne pour gérer le contenu du site Leidimen directement via GitHub.

## 🎯 Fonctionnalités

- ✅ **Création de posts** avec formulaire interactif
- ✅ **Validation des données** en temps réel
- ✅ **Prévisualisation** du Markdown généré
- ✅ **Commit automatique** sur GitHub via API
- ✅ **Statistiques** du site (posts, membres, villages)
- ✅ **Liste des posts** récents
- ✅ **Interface responsive** (mobile-friendly)
- 🚧 **Upload d'images** (à venir)
- 🚧 **Création de galeries** (à venir)

## 🚀 Installation

### Prérequis

- Node.js 16+ installé
- Token GitHub avec permissions `repo`
- Accès au repository `hdicko/leidimen`

### Étapes

1. **Installer les dépendances**

```bash
cd cms-web
npm install
```

2. **Configurer les variables d'environnement**

```bash
cp .env.example .env
```

Éditer `.env` et ajouter votre token GitHub :

```env
GITHUB_TOKEN=ghp_votre_token_ici
PORT=3000
```

**Créer un token GitHub :**
- Aller sur https://github.com/settings/tokens
- Cliquer sur "Generate new token (classic)"
- Cocher la permission `repo` (Full control)
- Copier le token généré

3. **Démarrer le serveur**

```bash
npm start
```

Ou en mode développement (auto-reload) :

```bash
npm run dev
```

4. **Ouvrir l'interface**

Naviguer vers : http://localhost:3000

## 📖 Utilisation

### Créer un nouveau post

1. Remplir le formulaire avec toutes les informations requises :
   - **Titre** : Titre de l'article
   - **Date** : Date de publication
   - **Villages** : Sélectionner un ou plusieurs villages (Ctrl+clic)
   - **Catégorie** : Éducation, Santé, Infrastructure, etc.
   - **Mood** : Heureux, Triste, Inspiré, Motivé, Reconnaissant
   - **Tags** : Mots-clés séparés par virgules
   - **Description** : Résumé SEO (150-160 caractères)
   - **Image** : Chemin vers l'image de couverture
   - **Contenu** : Corps de l'article en Markdown

2. **Prévisualiser** (optionnel) pour vérifier le Markdown généré

3. Cocher **"Enregistrer comme brouillon"** si vous ne voulez pas publier immédiatement

4. Cliquer sur **"Créer et Publier"**

Le post sera automatiquement :
- Créé dans `content/posts/YYYY/slug.md`
- Commité sur GitHub
- Publié sur le site (après build)

### Voir les posts récents

Cliquer sur **"Liste des Posts"** dans la sidebar pour voir les 10 derniers posts créés.

### Statistiques

La sidebar affiche en temps réel :
- Nombre de posts
- Nombre de villages
- Nombre de membres de l'équipe

## 🏗️ Architecture

```
cms-web/
├── index.html          # Interface principale
├── app.js              # Logique frontend (JavaScript)
├── styles.css          # Styles CSS
├── server.js           # Backend API (Node.js + Express)
├── package.json        # Dépendances
├── .env                # Variables d'environnement (non versionné)
└── README.md           # Cette documentation
```

### Flow de données

```
┌─────────────┐
│   Browser   │
│ (Frontend)  │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────┐
│  Express    │
│  Server     │
└──────┬──────┘
       │ Octokit
       ▼
┌─────────────┐
│   GitHub    │
│     API     │
└─────────────┘
```

## 🔧 API Endpoints

### `GET /api/health`
Health check du serveur

### `POST /api/create-post`
Créer ou mettre à jour un post

**Body:**
```json
{
  "path": "content/posts/2025/mon-article.md",
  "content": "---\ntitle: ...\n---\n\nContenu...",
  "message": "feat: Add post - Mon article",
  "branch": "main"
}
```

### `GET /api/stats`
Récupérer les statistiques du site

**Response:**
```json
{
  "posts": 42,
  "members": 12,
  "villages": 10
}
```

### `GET /api/posts`
Liste des 10 posts les plus récents

**Response:**
```json
[
  {
    "title": "Mon article",
    "date": "2025-11-04",
    "description": "...",
    "villages": ["dorool"],
    "category": "Éducation",
    "mood": "heureux",
    "path": "content/posts/2025/mon-article.md"
  }
]
```

## 🎨 Technologies utilisées

**Frontend:**
- HTML5 / CSS3
- JavaScript (ES6+)
- Bootstrap 5.3
- Bootstrap Icons

**Backend:**
- Node.js
- Express.js
- Octokit (GitHub API)
- dotenv

## 🔐 Sécurité

- ⚠️ **Ne jamais commiter le fichier `.env`** (contient le token GitHub)
- Le `.gitignore` doit inclure `.env`
- Utiliser des tokens GitHub avec permissions minimales
- Pour la production, ajouter de l'authentification utilisateur

## 🐛 Dépannage

### Le serveur ne démarre pas

```bash
# Vérifier que Node.js est installé
node --version  # Doit afficher v16+

# Vérifier que les dépendances sont installées
npm install

# Vérifier que le fichier .env existe et contient GITHUB_TOKEN
cat .env
```

### Erreur "401 Unauthorized"

Le token GitHub est invalide ou manquant :
- Vérifier que `GITHUB_TOKEN` est dans `.env`
- Régénérer un token sur GitHub
- Vérifier que le token a la permission `repo`

### Les posts n'apparaissent pas

- Vérifier que le commit a été fait sur GitHub
- Le site nécessite un rebuild (GitHub Actions ou `./deploy.sh`)
- Vérifier que `draft: false` dans le frontmatter

## 📝 TODO

- [ ] Upload d'images via formulaire
- [ ] Création de galeries multi-images
- [ ] Édition de posts existants
- [ ] Suppression de posts
- [ ] Gestion des membres de l'équipe
- [ ] Authentification utilisateur
- [ ] Prévisualisation HTML (pas seulement Markdown)
- [ ] Support des shortcodes Hugo
- [ ] Validation avancée du frontmatter

## 📄 Licence

MIT - Leidimen Association

## 🤝 Contribution

Pour contribuer au CMS, créer une issue ou une pull request sur GitHub.

---

**Créé avec ❤️ pour Leidimen**
