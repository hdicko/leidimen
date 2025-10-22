# Guide de Création d'un Nouvel Article
## Association Leidimen - Netlify CMS

---

**Date:** Octobre 2025  
**Version:** 1.0  
**Auteur:** Documentation Technique Leidimen

---

## Table des matières

1. [Introduction](#introduction)
2. [Prérequis](#prerequis)
3. [Accéder à l'interface d'administration](#acces)
4. [Créer un nouvel article - Étape par étape](#creation)
5. [Remplir les champs obligatoires](#champs-obligatoires)
6. [Ajouter les métadonnées](#metadonnees)
7. [Rédiger le contenu](#contenu)
8. [Prévisualiser et publier](#publication)
9. [Exemples concrets](#exemples)
10. [Résolution de problèmes](#problemes)

---

## 1. Introduction

Ce guide vous explique comment créer un nouvel article pour le site web de l'association Leidimen en utilisant l'interface Netlify CMS. Cette interface permet de gérer facilement le contenu du site sans avoir besoin de connaissances techniques en programmation.

### Avantages de Netlify CMS

- ✅ Interface intuitive et facile à utiliser
- ✅ Gestion des images simplifiée
- ✅ Prévisualisation en temps réel
- ✅ Sauvegarde automatique
- ✅ Gestion des versions (historique)
- ✅ Workflow de publication (brouillon → publication)

---

## 2. Prérequis

### Pour le développement local

1. **Serveur Hugo démarré**
   - Le site doit être accessible localement
   
2. **Serveur Netlify CMS Proxy démarré**
   - Nécessaire pour l'édition en local

### Pour la production

1. **Compte Netlify Identity** (si configuré)
2. **Permissions d'écriture** sur le repository GitHub

---

## 3. Accéder à l'interface d'administration {#acces}

### En développement local

1. Assurez-vous que les deux serveurs sont démarrés :

```bash
# Terminal 1 - Démarrer le proxy Netlify CMS
npx netlify-cms-proxy-server
```

```bash
# Terminal 2 - Démarrer Hugo
hugo server -D
```

2. Ouvrir votre navigateur web

3. Accéder à l'URL suivante :
   ```
   http://localhost:1313/leidimen/admin/
   ```

### En production

1. Ouvrir votre navigateur web

2. Accéder à l'URL suivante :
   ```
   https://hdicko.github.io/leidimen/admin/
   ```

3. Se connecter avec vos identifiants Netlify Identity

---

## 4. Créer un nouvel article - Étape par étape {#creation}

### Étape 1 : Accéder à la collection Articles

Une fois dans l'interface d'administration :

1. Dans le menu latéral gauche, cliquer sur **"📝 Articles"**
2. La liste des articles existants s'affiche
3. En haut à droite, cliquer sur le bouton **"New Article"**

> **Note :** Vous pouvez également utiliser le raccourci clavier `Ctrl + E` (ou `Cmd + E` sur Mac)

### Étape 2 : Le formulaire de création s'affiche

Vous verrez un formulaire avec plusieurs sections :
- Informations principales (Titre, Date, Auteur)
- Métadonnées SEO (Description, Image)
- Taxonomies (Villages, Moods, Catégories, Tags)
- Contenu (Éditeur Markdown)

---

## 5. Remplir les champs obligatoires {#champs-obligatoires}

### 5.1. Titre (Obligatoire)

**Champ :** `Titre`  
**Type :** Texte court  
**Format :** Maximum 60 caractères recommandés pour le SEO

**Conseils :**
- Soyez clair et descriptif
- Incluez le nom du village si pertinent
- Évitez les titres trop longs
- Utilisez des mots-clés importants

**Exemples :**
- ✅ Bon : "Inauguration de la nouvelle école de Dorool - Octobre 2025"
- ✅ Bon : "Projet de puits à Darawal : Premier bilan positif"
- ❌ À éviter : "nouvelle école"
- ❌ À éviter : "Un projet super cool qui va changer plein de choses pour toujours"

---

### 5.2. Date de publication (Obligatoire)

**Champ :** `Date de publication`  
**Type :** Date et heure  
**Format :** AAAA-MM-JJ

**Comment remplir :**
1. Cliquer sur le champ date
2. Un calendrier s'affiche
3. Sélectionner la date souhaitée
4. Ou saisir manuellement au format AAAA-MM-JJ (ex: 2025-10-10)

**Conseils :**
- Utilisez la date réelle de l'événement ou de la rédaction
- Pour un article programmé, utilisez une date future
- La date influence l'ordre d'affichage des articles

---

### 5.3. Contenu (Obligatoire)

**Champ :** `Contenu`  
**Type :** Éditeur Markdown  
**Format :** Markdown (langage de formatage simple)

**Structure recommandée :**

```markdown
## Introduction

Paragraphe d'introduction qui présente le sujet...

## Développement

### Sous-section 1

Détails et explications...

### Sous-section 2

Plus d'informations...

## Conclusion

Résumé et perspectives...
```

**Voir la section 7 pour plus de détails sur la rédaction du contenu.**

---

## 6. Ajouter les métadonnées {#metadonnees}

### 6.1. Auteur (Optionnel)

**Champ :** `Auteur`  
**Type :** Texte court  
**Valeur par défaut :** "Leidimen"

**Options :**
- Laisser "Leidimen" pour un article collectif
- Indiquer le nom du rédacteur si souhaité
- Format recommandé : "Prénom Nom" ou "Association Leidimen"

**Exemples :**
- "Leidimen"
- "Hamadoun Dicko"
- "Équipe Leidimen"

---

### 6.2. Description courte (Recommandé)

**Champ :** `Description courte`  
**Type :** Texte long (2-3 lignes)  
**Longueur :** 150-160 caractères recommandés

**Utilité :**
- Améliore le référencement SEO
- S'affiche dans les résultats de recherche Google
- Apparaît lors du partage sur les réseaux sociaux
- Donne un aperçu de l'article

**Conseils :**
- Résumez l'article en une phrase
- Incluez des mots-clés importants
- Donnez envie de lire la suite
- Évitez les phrases trop génériques

**Exemples :**
```
✅ Bon :
"L'école de Dorool accueille 150 élèves dans ses nouvelles classes 
équipées grâce au soutien de Leidimen et de ses donateurs."

❌ À éviter :
"Un article sur une école."
```

---

### 6.3. Image principale (Recommandé)

**Champ :** `Image principale`  
**Type :** Fichier image  
**Formats acceptés :** JPG, PNG, GIF

**Spécifications techniques :**
- **Taille maximale :** 2 MB
- **Dimensions recommandées :** 1200 x 630 pixels
- **Format préféré :** JPG pour les photos, PNG pour les graphiques
- **Ratio d'aspect :** 16:9 ou 1.91:1 (optimal pour réseaux sociaux)

**Comment ajouter une image :**
1. Cliquer sur **"Choose an image"** ou **"Choisir une image"**
2. Deux options :
   - **Upload** : Télécharger une nouvelle image depuis votre ordinateur
   - **Media Library** : Choisir une image déjà téléchargée
3. Sélectionner l'image
4. Cliquer sur **"Choose selected"**

**Bonnes pratiques :**
- Utilisez des images de haute qualité
- Évitez les images floues ou pixelisées
- Privilégiez des photos avec des personnes (plus engageant)
- Assurez-vous d'avoir les droits sur l'image
- Nommez vos fichiers de manière descriptive : `dorool-ecole-2025.jpg`

---

### 6.4. Villages concernés (Recommandé)

**Champ :** `Villages concernés`  
**Type :** Liste de sélection multiple  
**Options disponibles :**

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

**Comment sélectionner :**
1. Cliquer sur le champ "Villages concernés"
2. Un menu déroulant s'affiche
3. Cliquer sur un ou plusieurs villages
4. Les villages sélectionnés apparaissent avec une croix pour les supprimer

**Utilité :**
- Permet de filtrer les articles par village
- Crée des liens automatiques vers les pages villages
- Améliore la navigation sur le site
- Facilite la recherche pour les visiteurs

**Conseils :**
- Sélectionnez tous les villages pertinents
- Ne sélectionnez que les villages directement concernés
- Si l'article est général, vous pouvez ne rien sélectionner

---

### 6.5. Catégories (Recommandé)

**Champ :** `Catégories`  
**Type :** Liste libre (vous pouvez ajouter des catégories)

**Catégories suggérées :**
- Éducation
- Santé
- Infrastructure
- Développement
- Événement
- Témoignage
- Rapport
- Agriculture
- Environnement
- Formation
- Microfinance

**Comment ajouter des catégories :**
1. Cliquer dans le champ "Catégories"
2. Taper le nom d'une catégorie
3. Appuyer sur `Entrée` pour valider
4. Répéter pour ajouter plusieurs catégories

**Conseils :**
- Utilisez 1 à 3 catégories maximum
- Privilégiez les catégories existantes pour la cohérence
- Utilisez des noms en français
- Utilisez une majuscule au début

**Exemples :**
```
Article sur une école : Éducation, Infrastructure
Article sur un puits : Infrastructure, Développement
Article sur une formation : Formation, Développement
```

---

### 6.6. Tags (Recommandé)

**Champ :** `Tags`  
**Type :** Liste libre

**Différence Tags vs Catégories :**
- **Catégories** : Thèmes généraux (ex: Éducation)
- **Tags** : Mots-clés spécifiques (ex: école, élèves, manuels)

**Comment ajouter des tags :**
1. Cliquer dans le champ "Tags"
2. Taper un mot-clé
3. Appuyer sur `Entrée`
4. Répéter pour ajouter d'autres tags

**Conseils :**
- Utilisez 3 à 8 tags
- Utilisez des mots-clés recherchés par les visiteurs
- Soyez spécifique (ex: "bibliothèque" plutôt que "bâtiment")
- Utilisez des minuscules
- Utilisez le singulier de préférence

**Exemples de tags pertinents :**
```
Pour un article sur une école :
école, éducation, élève, enseignant, classe, manuel, bibliothèque, 
rentrée scolaire, formation

Pour un article sur un puits :
puits, eau, hydraulique, village, accès à l'eau, développement, 
infrastructure
```

---

### 6.7. Humeur/Mood (Optionnel)

**Champ :** `Humeur/Mood`  
**Type :** Liste de sélection multiple  
**Options disponibles :**

- Heureux
- Triste
- Inspiré
- Motivé
- Reconnaissant

**Utilité :**
- Ajoute une dimension émotionnelle à l'article
- Permet de filtrer les articles par sentiment
- Crée une connexion avec les lecteurs

**Conseils :**
- Sélectionnez 1 à 2 moods maximum
- Choisissez le sentiment principal de l'article
- Optionnel : peut être laissé vide

---

### 6.8. Brouillon (Optionnel)

**Champ :** `Brouillon`  
**Type :** Case à cocher  
**Valeur par défaut :** Décoché (false)

**Options :**
- ☐ **Décoché** : L'article sera visible sur le site après publication
- ☑ **Coché** : L'article sera caché du site (mode brouillon)

**Utilité :**
- Permet de sauvegarder un article en cours de rédaction
- L'article n'apparaît pas sur le site public
- Utile pour relecture et validation avant publication

**Workflow recommandé :**
1. Cocher "Brouillon" lors de la création
2. Rédiger et sauvegarder plusieurs fois
3. Relire et corriger
4. Décocher "Brouillon" avant la publication finale

---

## 7. Rédiger le contenu {#contenu}

### 7.1. Éditeur Markdown

L'éditeur de contenu utilise le **Markdown**, un langage de formatage simple et intuitif.

**Interface de l'éditeur :**
- Barre d'outils avec raccourcis de formatage
- Zone de texte pour la rédaction
- Prévisualisation (si disponible)

---

### 7.2. Syntaxe Markdown - Guide complet

#### Titres

```markdown
## Titre niveau 2 (principal)
### Titre niveau 3 (sous-section)
#### Titre niveau 4 (sous-sous-section)
```

**Rendu :**

## Titre niveau 2 (principal)
### Titre niveau 3 (sous-section)
#### Titre niveau 4 (sous-sous-section)

**Conseils :**
- Ne pas utiliser de titre niveau 1 (#) dans le contenu
- Le titre niveau 1 est réservé au titre de l'article
- Utilisez les niveaux de manière hiérarchique

---

#### Paragraphes

```markdown
Ceci est un premier paragraphe.

Ceci est un second paragraphe. Laissez une ligne vide entre 
les paragraphes pour les séparer.
```

**Conseils :**
- Paragraphes courts (3-4 lignes maximum)
- Une ligne vide entre chaque paragraphe
- Évitez les paragraphes trop longs

---

#### Mise en forme du texte

```markdown
**Texte en gras**
*Texte en italique*
***Texte en gras et italique***
~~Texte barré~~
```

**Rendu :**
- **Texte en gras**
- *Texte en italique*
- ***Texte en gras et italique***
- ~~Texte barré~~

---

#### Listes à puces

```markdown
- Premier élément
- Deuxième élément
- Troisième élément
  - Sous-élément (indenter avec 2 espaces)
  - Autre sous-élément
- Quatrième élément
```

**Rendu :**
- Premier élément
- Deuxième élément
- Troisième élément
  - Sous-élément
  - Autre sous-élément
- Quatrième élément

---

#### Listes numérotées

```markdown
1. Première étape
2. Deuxième étape
3. Troisième étape
   1. Sous-étape
   2. Autre sous-étape
4. Quatrième étape
```

**Rendu :**
1. Première étape
2. Deuxième étape
3. Troisième étape
   1. Sous-étape
   2. Autre sous-étape
4. Quatrième étape

---

#### Liens

```markdown
[Texte du lien](https://example.com)
[Page d'accueil](/leidimen/)
[À propos de nous](/leidimen/about/)
```

**Rendu :**
- [Texte du lien](https://example.com)
- [Page d'accueil](/leidimen/)

**Conseils :**
- Utilisez des liens internes vers d'autres pages du site
- Utilisez des textes de lien descriptifs
- Évitez "cliquez ici" comme texte de lien

---

#### Images

```markdown
![Texte alternatif](/images/uploads/nom-image.jpg)
```

**Composants de l'image :**
- `![...]` : Indique que c'est une image
- `Texte alternatif` : Description pour l'accessibilité
- `/images/uploads/nom-image.jpg` : Chemin de l'image

**Conseils :**
- Le texte alternatif est important pour l'accessibilité
- Décrivez ce que montre l'image
- Utilisez le chemin `/images/uploads/` pour les images téléchargées via CMS

---

#### Citations

```markdown
> Ceci est une citation importante.
> Elle peut s'étendre sur plusieurs lignes.
> 
> — Auteur de la citation
```

**Rendu :**
> Ceci est une citation importante.
> Elle peut s'étendre sur plusieurs lignes.
> 
> — Auteur de la citation

**Utilisation :**
- Témoignages
- Citations importantes
- Mise en valeur d'informations

---

#### Tableaux

```markdown
| Colonne 1     | Colonne 2     | Colonne 3     |
|---------------|---------------|---------------|
| Donnée 1      | Donnée 2      | Donnée 3      |
| Donnée 4      | Donnée 5      | Donnée 6      |
| Donnée 7      | Donnée 8      | Donnée 9      |
```

**Rendu :**

| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Donnée 1  | Donnée 2  | Donnée 3  |
| Donnée 4  | Donnée 5  | Donnée 6  |

**Utilisation :**
- Présentation de données structurées
- Comparaisons
- Statistiques

---

#### Ligne de séparation

```markdown
---
```

**Rendu :**

---

**Utilisation :**
- Séparer des sections
- Créer une pause visuelle

---

### 7.3. Structure d'article recommandée

Voici une structure complète et harmonisée pour vos articles :

```markdown
## 📋 Résumé

Paragraphe d'introduction de 2-3 phrases qui résume l'article 
et capte l'attention du lecteur.

## 🎯 Contexte

Expliquer le contexte et pourquoi ce sujet est important pour 
Leidimen et les communautés concernées.

### Situation actuelle

Description de la situation...

### Enjeux

Quels sont les enjeux...

## 📖 Développement

### Premier point important

Développement détaillé avec :
- Des faits concrets
- Des chiffres si disponibles
- Des témoignages

### Deuxième point important

Autre aspect avec exemples et illustrations...

### Troisième point important

Détails supplémentaires...

## 🌟 Témoignages

> « Citation d'un membre de la communauté ou d'un bénéficiaire »  
> — Nom de la personne, Fonction

> « Autre témoignage significatif »  
> — Autre personne

## 📊 Résultats et Impact

### Impact quantitatif

- **150 élèves** bénéficient du nouveau programme
- **3 enseignants** formés
- **500 livres** dans la bibliothèque

### Impact qualitatif

Description des améliorations et changements positifs...

## 🔮 Perspectives

### Prochaines étapes

1. Étape future 1
2. Étape future 2
3. Étape future 3

### Comment contribuer

Informations sur comment soutenir le projet...

## 💡 Pour aller plus loin

- [Article connexe 1](/leidimen/posts/article-1/)
- [Article connexe 2](/leidimen/posts/article-2/)
- [Galerie photos](/leidimen/galleries/nom-galerie/)

---

**📅 Date de publication :** 10 octobre 2025  
**✍️ Auteur :** Nom de l'auteur  
**📍 Villages concernés :** Dorool, Darawal  
**🏷️ Tags :** #école #éducation #mali

**📞 Contact :** Pour plus d'informations ou pour soutenir ce projet, 
contactez-nous à association@leidimen.com
```

---

## 8. Prévisualiser et publier {#publication}

### 8.1. Sauvegarder le brouillon

**Pendant la rédaction :**

1. Cliquer sur **"Save"** en haut à droite
2. Ou utiliser le raccourci clavier : `Ctrl + S` (ou `Cmd + S` sur Mac)
3. L'article est sauvegardé en mode brouillon

**Sauvegarde automatique :**
- Netlify CMS sauvegarde automatiquement toutes les quelques minutes
- Un indicateur "Saving..." apparaît lors de la sauvegarde

### 8.2. Prévisualiser

**Option 1 : Prévisualisation dans l'éditeur**
- Certains champs offrent un aperçu en temps réel
- Le Markdown est rendu dans l'éditeur

**Option 2 : Prévisualisation sur le site**
1. Sauvegarder l'article (même en brouillon)
2. Ouvrir le site dans un nouvel onglet
3. Naviguer vers l'article (si publié)

### 8.3. Publier l'article

**Étapes de publication :**

1. **Vérifier tous les champs**
   - Titre ✓
   - Date ✓
   - Contenu ✓
   - Description ✓
   - Image ✓
   - Métadonnées (villages, catégories, tags) ✓

2. **Décocher "Brouillon"** si nécessaire
   - L'article sera visible sur le site

3. **Cliquer sur "Publish"**
   - En haut à droite de l'interface
   - Une confirmation peut être demandée

4. **Confirmation**
   - Un message de succès s'affiche
   - L'article est maintenant enregistré dans le repository Git

5. **Déploiement automatique**
   - GitHub Actions détecte le nouveau commit
   - Le site est automatiquement reconstruit
   - Délai : environ 2-5 minutes

### 8.4. Vérifier la publication

**Après publication :**

1. Attendre quelques minutes pour le déploiement

2. Ouvrir le site en production :
   ```
   https://hdicko.github.io/leidimen/
   ```

3. Vérifier que l'article apparaît :
   - Sur la page d'accueil (liste des articles)
   - Sur la page Articles
   - Dans les filtres (villages, catégories)

4. Tester :
   - Les liens fonctionnent
   - Les images s'affichent
   - Le format est correct

---

## 9. Exemples concrets {#exemples}

### Exemple 1 : Article sur une rentrée scolaire

**Métadonnées :**
- **Titre :** "Rentrée scolaire 2025 à l'école de Dorool"
- **Date :** 2025-10-10
- **Auteur :** "Leidimen"
- **Description :** "Retour sur la rentrée scolaire 2025 à l'école de Dorool avec l'inauguration de la nouvelle bibliothèque et l'accueil de 150 élèves."
- **Image :** dorool-rentree-2025.jpg
- **Villages :** Dorool
- **Catégories :** Éducation, Infrastructure
- **Tags :** école, dorool, rentrée scolaire, bibliothèque, élèves
- **Moods :** Heureux, Inspiré

**Contenu (extrait) :**

```markdown
## 📋 Résumé

Cette année, l'école de Dorool a connu une rentrée historique avec 
150 élèves accueillis et l'inauguration d'une nouvelle bibliothèque 
équipée de 500 livres.

## 🎯 Contexte

L'éducation est au cœur de notre mission à Leidimen. L'école de Dorool, 
soutenue depuis 2007, continue de se développer grâce à l'engagement des 
familles et de nos donateurs.

## 📖 Une rentrée record

### 150 élèves accueillis

Cette année marque une augmentation de **25%** du nombre d'élèves 
par rapport à 2024...

[Suite du contenu...]
```

---

### Exemple 2 : Article sur un projet de puits

**Métadonnées :**
- **Titre :** "Nouveau puits à Darawal : Un accès à l'eau pour 500 personnes"
- **Date :** 2025-09-15
- **Auteur :** "Équipe Leidimen"
- **Description :** "Le nouveau puits de Darawal apporte une solution durable d'accès à l'eau potable pour plus de 500 habitants du village et des hameaux environnants."
- **Image :** darawal-puits-2025.jpg
- **Villages :** Darawal
- **Catégories :** Infrastructure, Développement
- **Tags :** puits, eau, hydraulique, darawal, accès à l'eau
- **Moods :** Heureux, Reconnaissant

**Contenu (extrait) :**

```markdown
## 📋 Résumé

Après 6 mois de travaux, le nouveau puits de Darawal est désormais 
opérationnel et fournit de l'eau potable à plus de 500 personnes.

## 🎯 Contexte

### Le défi de l'eau à Darawal

Avant ce projet, les habitants devaient parcourir plusieurs kilomètres 
pour accéder à l'eau...

[Suite du contenu...]
```

---

### Exemple 3 : Article témoignage

**Métadonnées :**
- **Titre :** "Témoignage : Aïssata, enseignante à Dorool"
- **Date :** 2025-08-20
- **Auteur :** "Leidimen"
- **Description :** "Aïssata, enseignante depuis 10 ans à l'école de Dorool, partage son expérience et sa vision de l'éducation dans son village."
- **Image :** aissata-enseignante-dorool.jpg
- **Villages :** Dorool
- **Catégories :** Témoignage, Éducation
- **Tags :** témoignage, enseignant, dorool, éducation, femme
- **Moods :** Inspiré, Motivé

**Contenu (extrait) :**

```markdown
## 📋 Portrait

Aïssata Maïga, 35 ans, enseigne depuis 10 ans à l'école de Dorool. 
Rencontre avec une femme passionnée qui façonne l'avenir de sa 
communauté.

## 🌟 Son parcours

> « J'ai toujours voulu être enseignante. Quand j'étais petite, je 
> n'avais pas accès à l'école dans mon village. Maintenant, je veux 
> offrir cette chance à tous les enfants. »  
> — Aïssata Maïga, Enseignante

[Suite du contenu...]
```

---

## 10. Résolution de problèmes {#problemes}

### Problème 1 : L'interface d'administration ne se charge pas

**Symptômes :**
- Page blanche
- Erreur "Cannot connect to server"
- Message "Netlify CMS is not responding"

**Solutions :**

1. **Vérifier que les serveurs sont démarrés**
   ```bash
   # Vérifier les processus en cours
   ps aux | grep hugo
   ps aux | grep netlify-cms-proxy
   ```

2. **Redémarrer les serveurs**
   ```bash
   # Arrêter les processus
   pkill -f "hugo server"
   pkill -f "netlify-cms-proxy"
   
   # Redémarrer
   npx netlify-cms-proxy-server &
   hugo server -D &
   ```

3. **Vider le cache du navigateur**
   - Chrome/Edge : `Ctrl + Shift + Del`
   - Firefox : `Ctrl + Shift + Del`
   - Safari : `Cmd + Option + E`

4. **Essayer un autre navigateur**
   - Chrome, Firefox, Edge, Safari

---

### Problème 2 : Impossible de sauvegarder l'article

**Symptômes :**
- Erreur lors de la sauvegarde
- Message "Failed to save"
- Bouton "Save" grisé

**Solutions :**

1. **Vérifier la connexion internet**

2. **Vérifier les permissions Git**
   ```bash
   git status
   git config user.name
   git config user.email
   ```

3. **Vérifier les champs obligatoires**
   - Titre rempli
   - Date sélectionnée
   - Contenu non vide

4. **Consulter la console du navigateur**
   - Appuyer sur `F12`
   - Onglet "Console"
   - Chercher les messages d'erreur

---

### Problème 3 : Les images ne s'affichent pas

**Symptômes :**
- Image cassée (icône ❌)
- Image ne se charge pas
- Emplacement vide

**Solutions :**

1. **Vérifier le chemin de l'image**
   - Format correct : `/images/uploads/nom-fichier.jpg`
   - Pas de caractères spéciaux dans le nom
   - Extension correcte (.jpg, .png, .gif)

2. **Vérifier que l'image existe**
   ```bash
   ls static/images/uploads/
   ```

3. **Vérifier la taille de l'image**
   - Maximum 2 MB
   - Redimensionner si nécessaire

4. **Re-télécharger l'image**
   - Supprimer l'image actuelle
   - Télécharger à nouveau

---

### Problème 4 : L'article ne s'affiche pas sur le site

**Symptômes :**
- Article publié mais invisible
- N'apparaît pas dans la liste
- Page 404

**Solutions :**

1. **Vérifier que l'article n'est pas en brouillon**
   - `draft: false`

2. **Vérifier la date de publication**
   - Date dans le passé ou présent (pas future)

3. **Attendre le déploiement**
   - Délai de 2-5 minutes après publication
   - Vérifier GitHub Actions

4. **Rafraîchir la page**
   - `Ctrl + F5` (Windows)
   - `Cmd + Shift + R` (Mac)

5. **Vérifier les erreurs de build**
   - Aller sur GitHub
   - Onglet "Actions"
   - Vérifier le dernier workflow

---

### Problème 5 : Le formatage Markdown ne fonctionne pas

**Symptômes :**
- Le texte apparaît brut avec les symboles
- Pas de mise en forme
- Les titres ne sont pas formatés

**Solutions :**

1. **Vérifier la syntaxe Markdown**
   - Espace après # pour les titres
   - Ligne vide entre les paragraphes
   - Syntaxe correcte pour les listes

2. **Exemples de syntaxe correcte :**
   ```markdown
   ## Titre (correct)
   ##Titre (incorrect - pas d'espace)
   
   - Liste (correct)
   -Liste (incorrect - pas d'espace)
   ```

3. **Utiliser la barre d'outils**
   - Boutons de formatage dans l'éditeur
   - Raccourcis clavier

4. **Tester dans un éditeur Markdown externe**
   - https://dillinger.io/
   - https://stackedit.io/

---

### Problème 6 : Les modifications ne sont pas sauvegardées

**Symptômes :**
- Les changements disparaissent
- Version précédente restaurée
- Perte de contenu

**Solutions :**

1. **Sauvegarder régulièrement**
   - `Ctrl + S` toutes les 2-3 minutes
   - Attendre la confirmation "Saved"

2. **Ne pas fermer l'onglet pendant la sauvegarde**
   - Attendre "Saved" avant de quitter

3. **Vérifier les conflits Git**
   - Plusieurs personnes éditent en même temps
   - Résoudre les conflits manuellement

4. **Copier le contenu régulièrement**
   - Copier dans un fichier texte de sauvegarde
   - Éviter la perte en cas de problème

---

## Annexes

### Annexe A : Raccourcis clavier

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Sauvegarder | Ctrl + S | Cmd + S |
| Gras | Ctrl + B | Cmd + B |
| Italique | Ctrl + I | Cmd + I |
| Lien | Ctrl + K | Cmd + K |
| Nouveau | Ctrl + E | Cmd + E |
| Rechercher | Ctrl + F | Cmd + F |

### Annexe B : Ressources utiles

**Documentation :**
- Hugo : https://gohugo.io/documentation/
- Netlify CMS : https://www.netlifycms.org/docs/
- Markdown : https://www.markdownguide.org/

**Outils en ligne :**
- Éditeur Markdown : https://dillinger.io/
- Compression d'images : https://tinypng.com/
- Redimensionnement : https://www.iloveimg.com/resize-image

**Support :**
- Email : association@leidimen.com
- GitHub : https://github.com/hdicko/leidimen

### Annexe C : Checklist de publication

Avant de publier, vérifier :

- [ ] Titre clair et accrocheur (< 60 caractères)
- [ ] Date correcte
- [ ] Description SEO (150-160 caractères)
- [ ] Image principale (< 2MB, 1200x630px)
- [ ] Villages concernés sélectionnés
- [ ] Catégories appropriées (1-3)
- [ ] Tags pertinents (3-8)
- [ ] Mood si applicable
- [ ] Contenu relu et corrigé
- [ ] Liens testés et fonctionnels
- [ ] Images avec texte alt
- [ ] Format Markdown correct
- [ ] Structure harmonisée respectée
- [ ] `draft: false` pour publier

---

## Glossaire

**Brouillon (Draft)** : Mode de sauvegarde qui garde l'article caché du site public.

**CMS** : Content Management System - Système de gestion de contenu.

**Markdown** : Langage de formatage de texte simple et lisible.

**Métadonnées** : Informations descriptives sur l'article (date, auteur, tags, etc.).

**SEO** : Search Engine Optimization - Optimisation pour les moteurs de recherche.

**Slug** : Version formatée du titre utilisée dans l'URL (ex: "mon-article" pour "Mon Article").

**Tag** : Mot-clé descriptif pour catégoriser et rechercher l'article.

**Taxonomie** : Système de classification (villages, catégories, tags, moods).

---

## Conclusion

Vous disposez maintenant de toutes les informations nécessaires pour créer des articles de qualité sur le site de Leidimen.

**Points clés à retenir :**
1. Remplir soigneusement tous les champs importants
2. Utiliser une structure harmonisée pour le contenu
3. Sauvegarder régulièrement
4. Vérifier avant de publier

**Pour aller plus loin :**
- Consultez `NETLIFY_CMS_GUIDE.md` pour des informations détaillées
- Utilisez `QUICK_REFERENCE.md` pour un aide-mémoire rapide
- N'hésitez pas à contacter l'équipe technique si nécessaire

---

**Document créé le :** 10 octobre 2025  
**Version :** 1.0  
**Contact :** association@leidimen.com  
**Site web :** https://hdicko.github.io/leidimen/

---

© 2025 Association Leidimen - Tous droits réservés
