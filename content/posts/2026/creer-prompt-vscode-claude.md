---
title: "Créer un Nouveau Prompt pour la Création de Blog"
date: 2026-01-21
draft: false
description: "Guide pratique pour créer des prompts personnalisés dans Visual Studio Code avec Claude Sonnet 4.5 pour automatiser la création de contenus."
image: "/images/uploads/default.jpeg"
villages:
  - "douentza"
categories:
  - "Éducation"
tags:
  - "technologie"
  - "formation"
  - "outils"
moods:
  - "motive"
---

## Introduction

La création de prompts personnalisés dans Visual Studio Code avec Claude Sonnet 4.5 permet d'automatiser et d'optimiser la création de contenus pour notre blog. Ce guide vous montre comment créer vos propres commandes réutilisables.

## Qu'est-ce qu'un Prompt Personnalisé ?

Un prompt personnalisé est une instruction réutilisable que vous pouvez sauvegarder et rappeler facilement dans VS Code. Il permet de standardiser des tâches répétitives comme la création d'articles de blog avec des structures cohérentes.

## Prérequis

- **Visual Studio Code** installé
- **Extension GitHub Copilot** activée
- **Claude Sonnet 4.5** comme modèle de conversation
- Un projet Hugo configuré

## Étapes de Création d'un Prompt

### 1. Ouvrir GitHub Copilot Chat

Dans Visual Studio Code, ouvrez le panneau de chat Copilot en utilisant :

- Raccourci clavier : `Ctrl+Alt+I` (Linux/Windows) ou `Cmd+Alt+I` (Mac)
- Ou depuis la barre latérale : cliquez sur l'icône Copilot

### 2. Travailler sur une Tâche Spécifique

Commencez par travailler avec Copilot sur une tâche concrète. Par exemple :

- Créer un article de blog avec des taxonomies spécifiques
- Configurer un composant Hugo
- Structurer du contenu avec des métadonnées

### 3. Utiliser la Commande `/savePrompt`

Une fois que vous avez accompli la tâche avec succès, tapez dans le chat :

```
/savePrompt
```

Cette commande analyse votre conversation et en extrait un modèle réutilisable.

### 4. Structure du Prompt

Claude Sonnet générera un fichier avec cette structure :

```markdown
---
name: nomDuPrompt
description: Description courte de l'objectif du prompt
argument-hint: Paramètres attendus (optionnel)
---

Instructions détaillées du prompt avec des placeholders
pour les éléments variables...
```

### 5. Sauvegarder le Prompt

Le prompt est créé dans un fichier non sauvegardé (`untitled:nomDuPrompt.prompt.md`). Sauvegardez-le :

- Dans `.github/prompts/` pour votre projet
- Ou dans `~/.vscode/prompts/` pour une utilisation globale

### 6. Utiliser le Prompt

Pour utiliser votre prompt sauvegardé, tapez dans le chat :

```
/nomDuPrompt [arguments optionnels]
```

## Exemple Pratique : Prompt pour Articles de Blog

Voici comment nous avons créé le prompt `createHugoBlogPost` :

1. **Conversation initiale** : Création d'un article avec taxonomies
2. **Commande** : `/savePrompt`
3. **Résultat** : Prompt générique pour créer des articles Hugo avec :
   - Structure de fichier automatique
   - Frontmatter complet
   - Gestion des taxonomies
   - Contenu généré

4. **Utilisation** : `/createHugoBlogPost title:"Mon article" village:dorool category:Santé`

## Bonnes Pratiques

### Nommage des Prompts

- Utilisez le **camelCase** : `createBlogPost`, `fixImageGallery`
- Soyez **descriptif** mais **concis** (1-3 mots)
- Utilisez des verbes d'action : `generate`, `create`, `fix`, `update`

### Description

- **1 phrase maximum**
- **15 mots ou moins**
- Soyez précis sur l'objectif

### Instructions

- Utilisez des **placeholders** génériques
- Incluez des **exemples** concrets
- Structurez avec des **sections numérotées**
- Ajoutez des **cas d'usage** spécifiques

## Avantages pour Notre Association

L'utilisation de prompts personnalisés permet :

- **Cohérence** : Tous les articles suivent la même structure
- **Gain de temps** : Automatisation des tâches répétitives
- **Formation** : Les nouveaux membres peuvent utiliser les prompts
- **Qualité** : Standards respectés systématiquement

## Cas d'Usage pour Leidimen

Exemples de prompts utiles pour notre projet :

- `createVillagePage` : Nouvelle page de village avec carte
- `addTeamMember` : Profil d'équipe avec timeline
- `createGalleryPost` : Article avec galerie photos
- `updateTaxonomies` : Mise à jour des classifications
- `migrateWordPressPost` : Import depuis ancien site

## Ressources Complémentaires

- [Documentation GitHub Copilot](https://docs.github.com/copilot)
- [Documentation Hugo](https://gohugo.io/documentation/)
- Guide interne : `CONTENT_CREATION_GUIDE.md`
- Référence rapide : `QUICK_REFERENCE.md`

## Conclusion

La création de prompts personnalisés avec Claude Sonnet 4.5 dans VS Code transforme notre workflow de création de contenu. Cette approche nous permet de maintenir la qualité tout en gagnant en efficacité, des compétences essentielles pour gérer notre site de solidarité internationale.

N'hésitez pas à expérimenter et à créer vos propres prompts adaptés à vos besoins spécifiques !
