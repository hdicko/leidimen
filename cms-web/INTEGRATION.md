# Intégration du CMS Web dans le Projet Leidimen Principal

## 📍 Emplacement

Le CMS Web a été créé dans un sous-dossier séparé :

```
leidimen/
├── content/           # Contenu Hugo (posts, about, etc.)
├── layouts/           # Templates Hugo
├── static/            # Fichiers statiques
├── cms-web/          # 🆕 CMS Web Interface (nouveau!)
│   ├── index.html
│   ├── server.js
│   ├── app.js
│   └── ...
├── leidimen-cli/     # CLI existant
└── hugo.toml
```

## 🔄 Relation avec les autres composants

### 1. CMS Web ↔️ Repository GitHub

```
CMS Web (localhost:3000)
    ↓ API GitHub (Octokit)
    ↓
GitHub Repository (hdicko/leidimen)
    ↓ Webhook/Actions
    ↓
Site Hugo Déployé (GitHub Pages)
```

### 2. CMS Web ↔️ CLI Leidimen

Les deux outils sont **complémentaires** :

- **CMS Web** : Interface graphique, facile pour les non-techniques
- **CLI Leidimen** : Script Python terminal, rapide pour les développeurs

Ils créent tous les deux des fichiers dans `content/posts/YYYY/` et commitent sur GitHub.

### 3. CMS Web ↔️ Netlify CMS

Les deux peuvent coexister :

- **Netlify CMS** : `https://hdicko.github.io/leidimen/admin/`
- **CMS Web** : `http://localhost:3000` (local uniquement)

Utiliser celui qui convient le mieux à votre workflow.

## 🚀 Déploiement

### Option 1 : Local uniquement (Actuel)

Le CMS Web tourne en local sur votre machine :

```bash
cd cms-web
npm start
# Accès: http://localhost:3000
```

**Avantages :**

- ✅ Pas de frais d'hébergement
- ✅ Contrôle total
- ✅ Configuration facile

**Inconvénients :**

- ❌ Accessible uniquement sur votre machine
- ❌ Nécessite Node.js installé

### Option 2 : Hébergement sur un serveur (Future)

Héberger le CMS Web sur un serveur pour accès distant.

**Options d'hébergement :**

1. **Vercel** (Recommandé)
   - Gratuit pour projets personnels
   - Déploiement automatique depuis GitHub
   - Configuration : `vercel.json`

2. **Heroku**
   - Gratuit (hobby tier)
   - Facile à déployer
   - Configuration : `Procfile`

3. **Railway**
   - Gratuit pour petits projets
   - Support Node.js natif
   - Déploiement Git

4. **DigitalOcean / AWS**
   - Plus de contrôle
   - Payant mais flexible
   - Nécessite configuration serveur

### Option 3 : Intégration dans le site Hugo

Ajouter le CMS Web comme sous-section du site :

```
https://hdicko.github.io/leidimen/cms/
```

**Configuration nécessaire :**

- Ajouter le CMS dans `static/cms/`
- Configurer le serveur backend séparément
- Ajouter authentification pour sécurité

## 🔐 Sécurité pour la production

### ⚠️ Ne PAS faire

- ❌ Exposer le token GitHub dans le code
- ❌ Permettre accès public sans authentification
- ❌ Commiter le fichier `.env`

### ✅ À faire avant production

1. **Ajouter authentification**

```javascript
// Exemple: GitHub OAuth
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Vérifier que l'utilisateur est autorisé
      if (
        profile.username === "hdicko" ||
        profile.organizations.includes("leidimen")
      ) {
        return done(null, profile);
      } else {
        return done(null, false, { message: "Unauthorized" });
      }
    },
  ),
);
```

2. **Utiliser HTTPS** (obligatoire en production)

3. **Limiter les permissions du token**
   - Créer un token avec accès uniquement au repo leidimen
   - Utiliser des GitHub Apps au lieu de tokens personnels

4. **Ajouter rate limiting**

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requêtes
});

app.use("/api/", limiter);
```

5. **Logger les actions**

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "cms.log" })],
});

// Logger chaque création de post
logger.info("Post created", {
  user: req.user.username,
  path: req.body.path,
  timestamp: new Date(),
});
```

## 🔗 Mise à jour du workflow

### Workflow actuel

```
1. Écrire contenu localement
2. hugo new posts/...
3. Éditer dans VS Code
4. git add/commit/push
5. ./deploy.sh
```

### Nouveau workflow avec CMS Web

```
1. Ouvrir http://localhost:3000
2. Remplir le formulaire
3. Cliquer "Créer et Publier"
4. ✅ Automatiquement commité sur GitHub
5. GitHub Actions rebuild le site (ou ./deploy.sh)
```

## 📊 Statistiques d'utilisation (Future)

Ajouter un tracking pour voir l'utilisation :

```javascript
// Dans server.js
let stats = {
  postsCreated: 0,
  lastCreated: null,
  users: [],
};

app.post("/api/create-post", async (req, res) => {
  // ... création du post ...

  stats.postsCreated++;
  stats.lastCreated = new Date();

  // Sauvegarder les stats
  fs.writeFileSync("stats.json", JSON.stringify(stats));
});
```

## 🎯 Recommandations

### Pour l'instant (Développement)

✅ Utiliser le CMS Web **en local** uniquement
✅ Continuer à utiliser Netlify CMS pour les contributions externes
✅ Utiliser le CLI pour les posts rapides

### Pour plus tard (Production)

⚠️ Déployer sur Vercel/Heroku avec authentification
⚠️ Ajouter upload d'images
⚠️ Créer des rôles utilisateurs (admin, éditeur, contributeur)

## 🔄 Mise à jour du GUIDE_CREATION_POST.md

Ajouter une nouvelle section au guide existant :

```markdown
## 🌐 Méthode 4 : CMS Web Interface (Nouveau!)

Interface web moderne avec formulaire graphique.

**Avantages:**

- Interface moderne et intuitive
- Prévisualisation en temps réel
- Validation des champs
- Commit automatique sur GitHub

**Comment utiliser:**

1. `cd cms-web && npm start`
2. Ouvrir http://localhost:3000
3. Remplir le formulaire
4. Cliquer "Créer et Publier"
```

## 📦 Scripts à ajouter au package.json principal

```json
{
  "scripts": {
    "cms:start": "cd cms-web && npm start",
    "cms:dev": "cd cms-web && npm run dev",
    "cms:install": "cd cms-web && npm install"
  }
}
```

Ensuite utiliser :

```bash
npm run cms:start
```

## 🎉 Résumé

Le **CMS Web** est maintenant **intégré** au projet Leidimen comme outil **complémentaire** :

- ✅ Interface graphique moderne
- ✅ Prêt à l'emploi en local
- ✅ Documenté complètement
- ✅ Facile à déployer
- 🚧 Authentification à ajouter pour production

---

**Note finale :** Le CMS Web ne remplace pas les autres outils (Netlify CMS, CLI), il offre une **alternative moderne** pour la gestion de contenu.
