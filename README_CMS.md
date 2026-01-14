# 🏛️ Leidimen CMS

**Système de gestion de contenu en ligne de commande pour le site Leidimen**

## 🚀 Démarrage ultra-rapide

```bash
./leidimen-cms
```

C'est tout ! Le CMS vous guide ensuite pas à pas.

## ✨ Ce que vous pouvez faire

1. **Créer un article simple** - Texte + métadonnées + image
2. **Créer une galerie photos** - Page bundle avec shortcode automatique
3. **Lister les posts récents** - Voir les 10 derniers articles

## 📝 Exemple d'utilisation

```bash
$ ./leidimen-cms

🏛️  LEIDIMEN CONTENT MANAGEMENT SYSTEM

📋 QUE VOULEZ-VOUS FAIRE?
  1. Créer un nouveau post (article simple)
  2. Créer un post avec galerie (page bundle)
  3. Lister les posts récents
  4. Quitter

Votre choix: 1

# Le CMS vous pose ensuite des questions :
# - Titre
# - Date
# - Villages (choix multiple)
# - Catégorie
# - Tags
# - Mood
# - Description SEO
# - Image
# - Contenu

✅ Fichier créé: content/posts/2025/mon-article.md
✅ Commit: feat: Add post - Mon article
✅ Poussé sur GitHub
🌐 https://hdicko.github.io/leidimen/posts/2025/mon-article/
```

## 💪 Avantages

- ✅ **Rapide** : Créer un post en 2 minutes
- ✅ **Guidé** : Questions interactives, pas besoin de connaître YAML
- ✅ **Automatique** : Commit et push sur GitHub en un clic
- ✅ **Cohérent** : Frontmatter standardisé, slug automatique
- ✅ **Galeries** : Support des page bundles pour PhotoSwipe

## 📚 Documentation complète

Consultez **[LEIDIMEN_CMS_GUIDE.md](LEIDIMEN_CMS_GUIDE.md)** pour :

- Guide détaillé des fonctionnalités
- Exemples de sessions
- Personnalisation
- Dépannage
- Comparaison avec Netlify CMS

## 🛠️ Prérequis

- Python 3.6+
- Git configuré
- Accès au repository GitHub

## 🎯 Cas d'usage

### Article simple avec texte

```bash
./leidimen-cms
# Choisir option 1
# Remplir les informations
# Le CMS commit et push automatiquement
```

### Galerie photos

```bash
./leidimen-cms
# Choisir option 2
# Remplir les métadonnées
# Copier vos images dans le dossier créé
# Commit manuellement ou via le CMS
```

## 🔧 Workflow complet

```bash
# 1. Créer le post
./leidimen-cms

# 2. (Optionnel) Tester en local
npm run dev

# 3. C'est déjà fait ! Le CMS a push sur GitHub
# Le site sera déployé automatiquement
```

## 🆚 Comparaison

| Fonctionnalité | Leidimen CMS | Netlify CMS | Hugo CLI   |
| -------------- | ------------ | ----------- | ---------- |
| Interface      | Terminal     | Web GUI     | Terminal   |
| Galeries       | ✅ Excellent | ❌ Limité   | ⚠️ Manuel  |
| Rapidité       | ⚡ 2 min     | 🐌 5 min    | ⚡ 1 min\* |
| Git intégré    | ✅ Auto      | ✅ Auto     | ❌ Manuel  |
| Validation     | ✅ Stricte   | ⚠️ Variable | ❌ Aucune  |
| Offline        | ✅ Oui       | ❌ Non      | ✅ Oui     |

\* _Mais nécessite de connaître YAML et la structure_

## 📞 Questions ?

- **Documentation** : [LEIDIMEN_CMS_GUIDE.md](LEIDIMEN_CMS_GUIDE.md)
- **Guide création** : [GUIDE_CREATION_POST.md](GUIDE_CREATION_POST.md)
- **Hugo docs** : [hugo.toml](hugo.toml)

---

**Version** : 1.0.0  
**Créé avec** : Python 3 + ❤️  
**Licence** : Leidimen Association
