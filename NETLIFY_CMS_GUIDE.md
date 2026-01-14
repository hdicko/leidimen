# Guide d'utilisation de Netlify CMS pour Leidimen

## 📋 Table des matières

1. [Accéder à Netlify CMS](#accéder-à-netlify-cms)
2. [Créer un nouvel article](#créer-un-nouvel-article)
3. [Structure standardisée d'un article](#structure-standardisée-dun-article)
4. [Gestion des autres contenus](#gestion-des-autres-contenus)
5. [Workflow de publication](#workflow-de-publication)
6. [Conseils et bonnes pratiques](#conseils-et-bonnes-pratiques)

---

## 🚀 Accéder à Netlify CMS

### En développement local

1. Démarrer le serveur proxy Netlify CMS :

   ```bash
   npx netlify-cms-proxy-server
   ```

2. Dans un autre terminal, démarrer Hugo :

   ```bash
   ./dev-server.sh
   # ou
   hugo server -D
   ```

3. Accéder à l'interface d'administration :
   - Ouvrir le navigateur : `http://localhost:1313/leidimen/admin/`

### En production (après déploiement)

- Accéder à : `https://hdicko.github.io/leidimen/admin/`
- Se connecter avec Netlify Identity (nécessite configuration)

---

## ✍️ Créer un nouvel article

### Étapes pour créer un article

1. **Accéder à la section Articles**
   - Cliquer sur "📝 Articles" dans le menu latéral
   - Cliquer sur "Nouvel Article"

2. **Remplir les champs obligatoires**
   - **Titre** : Le titre de l'article (obligatoire)
   - **Date de publication** : Date de publication de l'article
   - **Contenu** : Le corps de l'article en Markdown

3. **Remplir les métadonnées**
   - **Auteur** : Par défaut "Leidimen" (modifiable)
   - **Description courte** : Pour le SEO (150-160 caractères recommandés)
   - **Image principale** : Image de couverture (optionnelle)

4. **Catégoriser l'article**
   - **Villages concernés** : Sélectionner un ou plusieurs villages
   - **Humeur/Mood** : Ajouter une humeur (heureux, inspiré, etc.)
   - **Catégories** : Ex: Éducation, Santé, Infrastructure
   - **Tags** : Mots-clés pour faciliter la recherche

5. **Sauvegarder et publier**
   - **Save** : Sauvegarder en brouillon
   - **Publish** : Publier immédiatement
   - Cocher "Brouillon" pour masquer l'article du site

---

## 📝 Structure standardisée d'un article

### Format recommandé pour un article complet

```markdown
---
title: "Titre de l'article - Maximum 60 caractères pour SEO"
date: 2025-10-10
lastmod: 2025-10-10
author: "Leidimen"
draft: false
description: "Description courte de 150-160 caractères pour le SEO et les réseaux sociaux"
image: "/images/uploads/article-image.jpg"
villages:
  - dorool
  - darawal
moods:
  - heureux
  - inspire
categories:
  - Éducation
  - Développement
tags:
  - école
  - formation
  - jeunesse
---

## Introduction

Paragraphe d'introduction qui résume l'article et capte l'attention du lecteur.

## Section principale 1

Développement du premier point avec des détails, des anecdotes ou des données.

### Sous-section

Détails supplémentaires si nécessaire.

## Section principale 2

Deuxième point important de l'article.

## Conclusion

Résumé et perspectives futures.

---

**Pour en savoir plus :**

- [Lien vers ressource 1]
- [Lien vers ressource 2]
```

### Exemple d'article concret

```markdown
---
title: "Rentrée scolaire 2025 à l'école de Dorool"
date: 2025-10-10
author: "Leidimen"
draft: false
description: "Retour sur la rentrée scolaire 2025 à l'école de Dorool avec l'inauguration de la nouvelle bibliothèque et l'accueil de 150 élèves."
image: "/images/uploads/dorool-rentree-2025.jpg"
villages:
  - dorool
moods:
  - heureux
  - inspire
categories:
  - Éducation
tags:
  - école
  - dorool
  - rentrée scolaire
  - bibliothèque
---

## Une rentrée historique

Cette année, l'école de Dorool a accueilli **150 élèves** pour la rentrée scolaire 2025, soit une augmentation de 25% par rapport à l'année précédente. Cette croissance témoigne de l'engagement des familles et de la qualité de l'enseignement dispensé.

## Inauguration de la nouvelle bibliothèque

Le point fort de cette rentrée a été l'inauguration de la **bibliothèque scolaire**, financée grâce aux dons de nos membres et partenaires. Cette bibliothèque compte désormais :

- 500 livres en français
- 200 livres en langue locale
- Des manuels scolaires pour tous les niveaux
- Un espace de lecture aménagé

### Impact sur les élèves

Les enseignants rapportent déjà un enthousiasme notable des élèves qui découvrent le plaisir de la lecture. La bibliothèque est ouverte tous les jours de 8h à 17h.

## Formation des enseignants

En parallèle, **trois enseignants** ont bénéficié d'une formation pédagogique de deux semaines à Douentza, financée par Leidimen. Cette formation leur a permis d'acquérir de nouvelles méthodes d'enseignement adaptées aux classes multi-niveaux.

## Perspectives

L'année scolaire 2025-2026 s'annonce prometteuse. Nous prévoyons :

- L'équipement de deux classes supplémentaires
- L'organisation d'une bibliothèque mobile pour les villages voisins
- La mise en place d'un programme de soutien scolaire

## Merci à nos donateurs

Cette belle réussite n'aurait pas été possible sans le soutien de nos adhérents et donateurs. **Merci** pour votre générosité et votre confiance !

---

**Photos :** Consultez notre [galerie photos de la rentrée](/leidimen/galleries/dorool-rentree-2025/)

**Contact :** Pour soutenir l'école de Dorool, contactez-nous à association@leidimen.com
```

---

## 🗂️ Gestion des autres contenus

### Membres de l'équipe (👥 Équipe)

**Champs importants :**

- Nom complet
- Photo (format carré recommandé)
- Fonction (Président, Trésorier, etc.)
- Statut (fondateur, bureau, adhérent, bienfaiteur)
- Email et téléphone
- Spécialités

**Exemple de structure :**

```yaml
card:
  image: /images/membre-nom.jpg
  fonction: Président
  membre: bureau
  ville: Bondoufle
  pays: France
  email: prenom.nom@leidimen.com
  tel: +33123456789
  specialites:
    - Gestion de projet
    - Développement local
```

### Villages (🏘️ Villages)

**Champs importants :**

- Nom du village
- Population
- Région (par défaut : Douentza)
- Coordonnées GPS
- Projets en cours

### Documents (📄 Documents)

**Types de documents :**

- Rapport
- Politique
- Guide
- Formulaire
- Compte-rendu
- Statuts
- Adhésion

### Galeries (📸 Galeries)

**Structure recommandée :**

- Titre de la galerie
- Date et lieu
- Image de couverture
- Liste de photos avec légendes
- Crédits photo

---

## 🔄 Workflow de publication

### États des contenus

1. **Draft (Brouillon)**
   - Contenu en cours de rédaction
   - Non visible sur le site
   - Accessible uniquement dans l'admin

2. **In Review (En révision)**
   - Contenu prêt pour relecture
   - Nécessite validation
   - Non encore publié

3. **Ready (Prêt)**
   - Contenu validé
   - Prêt à être publié
   - Planifiable

4. **Published (Publié)**
   - Contenu visible sur le site
   - Indexé par les moteurs de recherche
   - Partageable sur les réseaux sociaux

### Processus de publication

```
Création → Sauvegarde en brouillon → Révision → Publication → Mise à jour si nécessaire
```

---

## 💡 Conseils et bonnes pratiques

### Rédaction d'articles

1. **Titre**
   - Maximum 60 caractères pour le SEO
   - Clair et descriptif
   - Inclure un mot-clé principal

2. **Description**
   - 150-160 caractères
   - Résumer l'article
   - Inclure un appel à l'action

3. **Images**
   - Format recommandé : JPG (photos), PNG (logos)
   - Taille maximale : 2 MB
   - Dimensions recommandées : 1200x630 px (pour le partage social)
   - Nommer les fichiers de manière descriptive : `dorool-ecole-2025.jpg`

4. **Contenu**
   - Utiliser des titres et sous-titres (##, ###)
   - Paragraphes courts (3-4 lignes maximum)
   - Listes à puces pour la lisibilité
   - Ajouter des liens internes vers d'autres articles
   - Citer les sources si nécessaire

5. **SEO**
   - Utiliser des mots-clés pertinents
   - Ajouter des tags et catégories
   - Remplir la description meta
   - Utiliser le texte alt pour les images

### Organisation des médias

```
static/images/uploads/
├── articles/
│   ├── 2025/
│   │   ├── dorool-rentree-2025.jpg
│   │   └── darawal-puits-2025.jpg
├── team/
│   ├── president-nom.jpg
│   └── tresorier-nom.jpg
├── villages/
│   ├── dorool-vue-generale.jpg
│   └── darawal-marche.jpg
└── galleries/
    ├── paris-2025/
    └── dorool-ecole/
```

### Syntaxe Markdown utile

````markdown
# Titre niveau 1

## Titre niveau 2

### Titre niveau 3

**Texte en gras**
_Texte en italique_

[Lien vers une page](https://example.com)

![Image avec texte alternatif](/images/photo.jpg)

- Liste à puces
- Item 2
  - Sous-item

1. Liste numérotée
2. Item 2

> Citation en bloc

`code en ligne`

```code
Bloc de code
```
````

---

## 🆘 Dépannage

### Problèmes courants

**L'admin ne se charge pas**

- Vérifier que le serveur proxy est démarré : `npx netlify-cms-proxy-server`
- Vérifier que Hugo est démarré : `hugo server -D`
- Vider le cache du navigateur

**Les images ne s'affichent pas**

- Vérifier le chemin de l'image
- S'assurer que l'image est dans `static/images/uploads/`
- Vérifier le format (JPG, PNG, GIF supportés)

**Les modifications ne sont pas visibles**

- Attendre quelques secondes (rebuild automatique)
- Rafraîchir la page (Ctrl+F5 ou Cmd+Shift+R)
- Vérifier que le contenu n'est pas en mode brouillon

**Erreur de sauvegarde**

- Vérifier la connexion internet
- Vérifier les permissions Git
- Consulter la console du navigateur (F12)

---

## 📞 Support

Pour toute question ou problème :

- Email : association@leidimen.com
- Documentation Hugo : https://gohugo.io/documentation/
- Documentation Netlify CMS : https://www.netlifycms.org/docs/

---

**Dernière mise à jour :** 10 octobre 2025
