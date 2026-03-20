---
title: "Guide : Créer un post avec le serveur MCP Hugo"
date: 2026-02-17
draft: false
description: "Guide complet pour créer des articles sur le site Leidimen via le serveur MCP Hugo : protocole MCP, outils de création de contenu et workflow automatisé."
image: /images/uploads/default.jpeg
categories:
  - informations
tags:
  - guide
  - mcp
  - technologie
  - documentation
villages:
  - douentza
moods:
  - inspire
  - motive
type: "posts"
---

## Introduction au serveur MCP Hugo

Le **Model Context Protocol (MCP)** est une nouvelle technologie qui permet à Claude (l'assistant IA) d'interagir directement avec les systèmes locaux. Pour le site Leidimen, nous avons développé un serveur MCP spécialisé qui facilite la création et la gestion de contenu Hugo.

## Qu'est-ce que MCP ?

MCP (Model Context Protocol) est un protocole open-source développé par Anthropic qui permet aux assistants IA comme Claude d'accéder à des outils et des données locales de manière sécurisée. Plutôt que de simplement générer du code, Claude peut maintenant **exécuter des actions** directement sur votre système.

### Avantages du serveur MCP Hugo pour Leidimen

✅ **Rapidité** : Créer un article en quelques secondes au lieu de plusieurs minutes  
✅ **Cohérence** : Frontmatter toujours correctement formaté  
✅ **Validation** : Vérification automatique des taxonomies (villages, catégories, moods)  
✅ **Intelligence** : Claude comprend le contexte du site et suggère les bonnes métadonnées  
✅ **Simplicité** : Plus besoin de connaître la structure des fichiers Hugo

## Configuration du serveur MCP

### Étape 1 : Installation des dépendances

Le serveur MCP Hugo nécessite Node.js. Installez les dépendances :

```bash
cd hugo-mcp-server
npm install
```

### Étape 2 : Configuration dans Claude Desktop

Ajoutez la configuration suivante au fichier de configuration de Claude Desktop :

**Sur Linux/Mac** : `~/.config/Claude/claude_desktop_config.json`  
**Sur Windows** : `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hugo-leidimen": {
      "command": "node",
      "args": ["/chemin/vers/leidimen/hugo-mcp-server/src/index.js"],
      "env": {
        "HUGO_ROOT": "/chemin/vers/leidimen"
      }
    }
  }
}
```

⚠️ **Important** : Remplacez `/chemin/vers/leidimen` par le chemin absolu vers votre dossier Leidimen.

### Étape 3 : Redémarrer Claude Desktop

Fermez complètement Claude Desktop et relancez-le pour que le serveur MCP soit chargé.

## Créer un post avec MCP : Guide pratique

### Méthode 1 : Utilisation du prompt guidé

Le serveur MCP inclut un prompt pré-configuré appelé **`new-post`** qui guide la création :

1. Dans Claude Desktop, tapez :

   ```
   Utilise le prompt "new-post" pour créer un article sur [sujet]
   ```

2. Claude vous posera des questions pour :
   - Le sujet de l'article
   - Le(s) village(s) concerné(s)
   - La catégorie appropriée
   - Les tags pertinents

3. Claude génère ensuite le contenu et **crée automatiquement le fichier** dans `content/posts/2026/`

### Méthode 2 : Commande directe

Vous pouvez aussi demander directement à Claude :

```
Crée un post sur la nouvelle école de Dorool avec les infos suivantes :
- Village : Dorool
- Catégorie : Éducation
- Tags : école, construction, projet
- Mood : heureux
```

Claude utilisera l'outil `create-post` pour générer le fichier avec le bon formatage.

### Exemple de conversation

**Vous** : "Crée un post sur la distribution de fournitures scolaires à Diona"

**Claude** : "Je vais créer un post sur la distribution de fournitures scolaires à Diona..."

```markdown
✅ Post créé !
📄 File: content/posts/2026/distribution-fournitures-diona.md
📅 Date: 2026-02-17
🏘️ Villages: diona
📁 Type: Single File
```

Le fichier est automatiquement créé avec :

- Frontmatter YAML correctement formaté
- Villages en minuscules (validation automatique)
- Type "posts" pour le bon template Hugo
- Structure de répertoire par année (2026)
- Slug généré automatiquement à partir du titre

## Outils disponibles dans le serveur MCP

Le serveur MCP Hugo Leidimen offre plusieurs outils puissants :

### 📝 Création de contenu

| Outil                | Description                           |
| -------------------- | ------------------------------------- |
| `create-post`        | Créer un nouvel article de blog       |
| `create-gallery`     | Créer une galerie photo (page bundle) |
| `create-team-member` | Ajouter un membre de l'équipe         |

### 🔍 Gestion de contenu

| Outil                | Description                                         |
| -------------------- | --------------------------------------------------- |
| `list-content`       | Lister les posts, galleries, équipe, villages       |
| `search-content`     | Recherche full-text dans tout le contenu            |
| `get-post-content`   | Lire le contenu d'un fichier existant               |
| `update-frontmatter` | Modifier les métadonnées d'un post                  |
| `validate-content`   | Vérifier les erreurs (taxonomies, champs manquants) |

### 🛠️ Développement

| Outil        | Description                              |
| ------------ | ---------------------------------------- |
| `build-site` | Compiler le site Hugo (production/draft) |
| `serve-site` | Lancer le serveur de développement local |

## Cas d'usage avancés

### Valider tout le contenu

```
Utilise validate-content pour vérifier tous les posts
```

Claude va scanner tous les fichiers et rapporter :

- Villages avec mauvaise casse (Dorool → dorool)
- Champs manquants (title, date, description)
- Descriptions trop longues (>160 caractères)
- Type manquant pour les posts

### Rechercher dans le contenu

```
Recherche tous les posts qui mentionnent "école"
```

Claude utilisera `search-content` pour trouver les correspondances dans :

- Titres
- Corps de texte
- Descriptions
- Tags
- Villages

### Lister les posts par village

```
Liste tous les posts du village de Diona
```

Claude filtrera automatiquement et affichera :

- Titre et date
- Chemin du fichier
- Villages associés
- Statut (draft ou publié)

## Bonnes pratiques

### ✅ À faire

- Toujours utiliser des **villages en minuscules** : `dorool`, `diona`, `debere`
- Inclure une **description SEO** (150-160 caractères)
- Utiliser le bon **type** : `"posts"` pour les articles
- Choisir des **moods appropriés** : heureux, triste, inspiré, motivé, reconnaissant
- Vérifier le contenu avec `validate-content` avant de publier

### ❌ À éviter

- Villages en majuscules (Dorool ❌ → dorool ✅)
- Descriptions trop longues (>160 caractères)
- Oublier le champ `type: "posts"`
- Créer des fichiers manuellement quand MCP peut le faire

## Workflow recommandé

1. **Création** : Utiliser MCP pour créer le post avec les bonnes métadonnées
2. **Validation** : Lancer `validate-content` pour vérifier
3. **Preview** : Utiliser `serve-site` pour voir le résultat local
4. **Publication** : Commit et push vers GitHub

```bash
# Aperçu local
npm run dev

# Validation avant commit
git add .
git commit -m "Ajout post [titre]"
git push origin main
```

## Dépannage

### Le serveur MCP ne se connecte pas

- Vérifiez le chemin dans `claude_desktop_config.json`
- Assurez-vous que Node.js est installé (`node --version`)
- Vérifiez les logs de Claude Desktop

### Les villages ne sont pas reconnus

Le serveur valide contre la liste officielle :

- douentza, dorool, diona, debere, diambana
- darawal, tanal, manko, tacouti, ndumpa

Toujours en **minuscules** !

### Le fichier existe déjà

MCP vérifie les doublons. Si un fichier avec le même nom existe, il vous avertira. Choisissez un titre différent ou supprimez l'ancien fichier.

## Conclusion

Le serveur MCP Hugo transforme la création de contenu pour Leidimen. Ce qui prenait plusieurs minutes (ouvrir l'éditeur, créer le fichier, formater le frontmatter, vérifier la syntaxe) se fait maintenant en quelques secondes avec une simple conversation en langage naturel.

### Prochaines étapes

1. Configurez le serveur MCP dans Claude Desktop
2. Testez avec `Crée un post de test`
3. Explorez les autres outils (`list-content`, `search-content`)
4. Consultez le [README du serveur MCP](https://github.com/hdicko/leidimen/tree/main/hugo-mcp-server) pour plus de détails

**Ressources utiles** :

- [Documentation officielle MCP](https://modelcontextprotocol.io)
- [Code source du serveur Hugo MCP](https://github.com/hdicko/leidimen/tree/main/hugo-mcp-server)
- [Guide de contribution Leidimen](https://github.com/hdicko/leidimen/blob/main/CONTENT_CREATION_GUIDE.md)

---

_Ce post a été créé avec le serveur MCP Hugo pour démontrer ses capacités. Méta, n'est-ce pas ? 😊_
