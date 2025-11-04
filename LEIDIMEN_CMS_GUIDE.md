# Leidimen CMS - Guide d'utilisation

## 🚀 Démarrage rapide

Le **Leidimen CMS** est un outil en ligne de commande qui simplifie la création de posts pour le site Hugo.

### Lancer le CMS

```bash
./leidimen-cms
```

Ou directement avec Python :

```bash
python3 leidimen-cms.py
```

## 📋 Fonctionnalités

### 1. Créer un nouveau post (article simple)

Cette option crée un article standard avec :
- Titre
- Date de publication
- Villages associés
- Catégorie
- Tags (mots-clés)
- Mood (humeur)
- Description SEO
- Image de couverture
- Contenu

**Le CMS vous guide étape par étape** avec des prompts interactifs.

#### Exemple de session

```
📝 CRÉATION D'UN NOUVEAU POST

📌 Titre du post: Construction d'une école à Dorool
   → Slug: construction-d-une-ecole-a-dorool

📅 Date de publication [2025-11-04]: 

🏘️  Sélection des villages
Choisissez le(s) village(s):
  1. dorool
  2. diona
  3. debere
  ...
💡 Entrez les numéros séparés par des virgules (ex: 1,3,5)
Votre choix: 1

📂 Sélection de la catégorie
  1. Éducation
  2. Santé
  3. Infrastructure
  ...
Votre choix: 1

🏷️  Tags (mots-clés)
Entrez les tags séparés par des virgules: école, éducation, projet

😊 Sélection du mood
  1. heureux
  2. triste
  3. inspiré
  ...
Votre choix: 1

📄 Description SEO (150-160 caractères): Une nouvelle école a été construite à Dorool pour accueillir 200 élèves

🖼️  Chemin de l'image [/images/uploads/default.jpg]: /images/uploads/ecole-dorool.jpg

📢 Publier immédiatement? [O/n]: o

✍️  CONTENU DU POST
💡 Entrez le contenu (tapez 'END' sur une ligne seule pour terminer):

Nous sommes heureux d'annoncer la construction d'une nouvelle école...
END

📋 RÉSUMÉ DU POST
============================================================
Titre      : Construction d'une école à Dorool
Date       : 2025-11-04
Villages   : dorool
Catégorie  : Éducation
Tags       : école, éducation, projet
Mood       : heureux
Image      : /images/uploads/ecole-dorool.jpg
Draft      : Non
Contenu    : 156 caractères
============================================================

✅ Confirmer la création? [O/n]: o

✅ Fichier créé: /home/dicko/dev/hugo/hugo_sites/leidimen/content/posts/2025/construction-d-une-ecole-a-dorool.md

💾 Voulez-vous commiter et pusher sur GitHub? [O/n]: o

✅ Commit: feat: Add post - Construction d'une école à Dorool
✅ Poussé sur GitHub

🌐 Le post sera bientôt visible sur:
   https://hdicko.github.io/leidimen/posts/2025/construction-d-une-ecole-a-dorool/
```

### 2. Créer un post avec galerie (page bundle)

Cette option crée une structure de **page bundle** pour les posts avec plusieurs photos.

**Workflow :**
1. Le CMS crée le dossier `content/posts/YEAR/slug/`
2. Crée le fichier `index.md` avec le frontmatter
3. Ajoute automatiquement le shortcode `{{< gallery >}}`
4. Vous copiez ensuite vos images dans le dossier
5. Le shortcode détecte automatiquement toutes les images

#### Exemple

```
📸 CRÉATION D'UN POST AVEC GALERIE

📌 Titre du post: Photos de la fête du village
📅 Date de publication [2025-11-04]: 
🏘️  Villages: dorool
📂 Catégorie: Culture
😊 Mood: heureux
📄 Description: Photos de la fête annuelle du village de Dorool

✅ Structure créée: content/posts/2025/photos-de-la-fete-du-village/
📁 Copiez vos images dans: content/posts/2025/photos-de-la-fete-du-village/
📝 Le fichier index.md a été créé avec le shortcode gallery

💾 Voulez-vous commiter maintenant? [O/n]: n

💡 Copiez vos images, puis commitez:
   cp ~/Photos/*.jpg content/posts/2025/photos-de-la-fete-du-village/
   git add content/posts/2025/photos-de-la-fete-du-village/
   git commit -m "feat: Add gallery - Photos de la fête du village"
   git push origin main
```

### 3. Lister les posts récents

Affiche les 10 derniers posts créés avec leurs chemins.

## 🎯 Avantages du CMS

### ✅ Simplicité
- Interface guidée pas à pas
- Validation automatique des entrées
- Pas besoin de connaître la syntaxe YAML

### ✅ Rapidité
- Création d'un post en 2 minutes
- Commit et push automatiques
- Slug généré automatiquement

### ✅ Cohérence
- Frontmatter standardisé
- Villages en minuscules (comme requis)
- Format de date correct
- Structure de fichiers respectée

### ✅ Intégration Git
- Commit automatique avec message formaté
- Push direct sur GitHub
- Ou option de commit manuel

## 📝 Données de référence

### Villages disponibles
- dorool
- diona
- debere
- diambana
- darawal
- tanal
- manko
- tacouti
- n'dumpa
- douentza

### Catégories
- Éducation
- Santé
- Infrastructure
- Agriculture
- Culture
- Économie

### Moods
- heureux
- triste
- inspiré
- motivé
- reconnaissant
- déterminé

## 🔧 Personnalisation

### Ajouter un village

Éditez `leidimen-cms.py` ligne 17 :

```python
VILLAGES = ["dorool", "diona", ..., "nouveau_village"]
```

### Ajouter une catégorie

Éditez ligne 18 :

```python
CATEGORIES = ["Éducation", "Santé", ..., "Nouvelle Catégorie"]
```

### Ajouter un mood

Éditez ligne 19 :

```python
MOODS = ["heureux", "triste", ..., "nouveau_mood"]
```

## ⚙️ Configuration

Le script détecte automatiquement :
- Le chemin du repository (où se trouve le script)
- L'owner GitHub (`hdicko`)
- Le nom du repo (`leidimen`)

### Modifier la configuration

Éditez les lignes 11-13 de `leidimen-cms.py` :

```python
REPO_OWNER = "hdicko"
REPO_NAME = "leidimen"
REPO_PATH = Path(__file__).parent
```

## 🛠️ Prérequis

- Python 3.6+
- Git installé et configuré
- Accès en écriture au repository

## 🐛 Dépannage

### Erreur: "Python 3 n'est pas installé"

Installez Python 3 :

```bash
sudo apt install python3
```

### Erreur Git lors du push

Vérifiez vos credentials Git :

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

### Le commit fonctionne mais pas le push

Vérifiez votre connexion à GitHub :

```bash
git remote -v
ssh -T git@github.com
```

## 🚀 Prochaines améliorations possibles

- [ ] Upload d'images intégré
- [ ] Édition de posts existants
- [ ] Prévisualisation avant commit
- [ ] Support des brouillons avec suivi
- [ ] Statistiques de publication
- [ ] Intégration MCP GitHub direct (sans git local)
- [ ] Interface web (Flask/Streamlit)
- [ ] Export en PDF

## 📚 Comparaison avec Netlify CMS

| Fonctionnalité | Leidimen CMS (CLI) | Netlify CMS |
|----------------|-------------------|-------------|
| Interface | Terminal | Web GUI |
| Galeries multi-images | ✅ Oui (page bundle) | ❌ Limité |
| Rapidité | ⚡ Très rapide | 🐌 Plus lent |
| Offline | ✅ Fonctionne | ❌ Nécessite serveur |
| Validation | ✅ Stricte | ⚠️ Variable |
| Learning curve | 📖 Facile | 📖 Très facile |
| Prévisualisation | ❌ Non | ✅ Oui |
| Upload images | ❌ Manuel | ✅ Drag & drop |

**Recommandation :** Utilisez **Leidimen CMS** pour les galeries et les posts techniques, **Netlify CMS** pour l'édition rapide avec prévisualisation.

## 💡 Astuces

### Création rapide de galerie

```bash
# 1. Créer le post avec galerie via CMS
./leidimen-cms
# Choisir option 2

# 2. Copier les images
cp ~/Photos/evenement/*.jpg content/posts/2025/mon-evenement/

# 3. Redimensionner si nécessaire
cd content/posts/2025/mon-evenement/
mogrify -resize 1920x1080\> *.jpg

# 4. Commit
git add .
git commit -m "feat: Add gallery - Mon événement"
git push
```

### Template de contenu

Créez des templates pour les types de posts récurrents dans `templates/` :

```markdown
# templates/school-opening.md
Nous sommes ravis d'annoncer l'ouverture de l'école de {VILLAGE}.

## Caractéristiques
- Capacité : {CAPACITY} élèves
- Salles de classe : {CLASSROOMS}
- Enseignants : {TEACHERS}

## Financement
Ce projet a été rendu possible grâce à...
```

Puis intégrez-les dans le CMS.

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation Hugo : `hugo.toml`, `QUICK_REFERENCE.md`
2. Vérifiez les logs Git : `git log --oneline`
3. Testez en local : `npm run dev`

---

**Version :** 1.0.0  
**Dernière mise à jour :** 4 novembre 2025
