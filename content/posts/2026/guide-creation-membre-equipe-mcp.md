---
title: "Guide : Ajouter un membre de l'équipe avec le serveur MCP"
date: 2026-02-17
type: "posts"
draft: false
description: "Tutoriel complet pour créer facilement des profils de membres Leidimen avec le serveur MCP Hugo"
categories: ["informations"]
tags: ["guide", "mcp", "équipe", "technologie", "administration"]
moods: ["inspire", "motive"]
villages: []
---

## Introduction

L'ajout de nouveaux membres à l'équipe Leidimen nécessite la création de profils détaillés avec des informations structurées. Grâce au **serveur MCP Hugo**, cette tâche qui prenait plusieurs minutes peut maintenant être accomplie en quelques secondes avec une simple conversation en langage naturel.

Ce guide vous montre comment utiliser l'outil `create-team-member` pour ajouter efficacement de nouveaux membres à la section équipe du site.

## Structure d'un profil membre Leidimen

Avant de créer un profil, il est important de comprendre les informations requises :

### Informations obligatoires

| Champ | Description | Exemple |
|-------|-------------|---------|
| **name** | Nom complet | "Abdoulaye Dicko" |
| **fonction** | Rôle dans l'association | "Président", "Trésorier", "Secrétaire" |
| **membre** | Statut du membre | fondateur, bureau, adherent, bienfaiteur |

### Informations optionnelles

| Champ | Description | Exemple |
|-------|-------------|---------|
| **image** | Photo de profil | "/images/team/abdoulaye.jpg" |
| **ville** | Ville de résidence | "Paris", "Lyon", "Douentza" |
| **pays** | Pays (par défaut: France) | "France", "Mali" |
| **email** | Adresse email | "contact@example.com" |
| **devise** | Motto personnel | "Ensemble pour l'éducation" |
| **specialites** | Compétences clés | ["Gestion de projet", "Finance"] |
| **presentation** | Courte biographie | "Passionné par l'éducation..." |
| **body** | Biographie complète | Texte Markdown détaillé |

## Les 4 statuts de membre

Le champ **`membre`** définit le niveau d'engagement :

1. **`fondateur`** : Membres fondateurs de Leidimen
2. **`bureau`** : Membres du bureau (CA, responsables)
3. **`adherent`** : Adhérents actifs
4. **`bienfaiteur`** : Donateurs et soutiens

## Créer un profil : Méthode pas à pas

### Méthode 1 : Demande simple

La façon la plus simple est de demander directement à Claude :

```
Crée un profil pour Jean Dupont, nouveau trésorier de Leidimen
```

Claude vous demandera alors les informations complémentaires :
- Statut (bureau dans ce cas)
- Ville et pays
- Email (optionnel)
- Courte présentation

### Méthode 2 : Commande complète

Pour un contrôle total, fournissez toutes les informations d'un coup :

```
Crée un profil de membre avec ces infos :
- Nom : Marie Martin
- Fonction : Secrétaire générale
- Statut : bureau
- Ville : Lyon
- Email : marie.martin@leidimen.fr
- Devise : "La solidarité n'a pas de frontières"
- Spécialités : Communication, Événementiel
- Présentation : Marie coordonne la communication de Leidimen depuis 2020
```

Claude utilisera automatiquement l'outil `create-team-member` avec tous les paramètres.

### Exemple de conversation réelle

**Vous** :
```
Ajoute Mamadou Koné comme nouveau membre adhérent.
Il vit à Bamako, Mali et s'occupe du suivi des projets sur place.
```

**Claude** :
```
Je vais créer le profil de Mamadou Koné...

✅ Team member created!
👤 Mamadou Koné
💼 Responsable suivi terrain (adherent)
📄 content/equipe/mamadou-kone.md
```

## Structure du fichier généré

Le serveur MCP crée automatiquement un fichier dans `content/equipe/` avec cette structure :

```yaml
---
title: "Mamadou Koné"
date: "2026-02-17"
draft: false
description: "Responsable du suivi des projets sur le terrain"
slug: "mamadou-kone"
weight: 10

card:
  image: "/images/team/default-avatar.jpg"
  fonction: "Responsable suivi terrain"
  membre: "adherent"
  presentation: "Responsable du suivi des projets sur le terrain"
  ville: "Bamako"
  pays: "Mali"
  email: ""
  devise: ""
  specialites: []
---

## Mamadou Koné

Bienvenue dans l'équipe Leidimen !
```

### Points clés à noter

✅ **Slug automatique** : Le nom de fichier est généré automatiquement (`mamadou-kone.md`)  
✅ **Normalisation** : Les accents sont retirés pour le slug (Koné → kone)  
✅ **Image par défaut** : Si aucune photo n'est fournie, une image par défaut est utilisée  
✅ **Date actuelle** : La date de création est automatiquement ajoutée  
✅ **Validation** : Le statut `membre` est vérifié (fondateur/bureau/adherent/bienfaiteur)

## Ajouter une photo de profil

Pour personnaliser le profil avec une vraie photo :

### Étape 1 : Placer l'image

Copiez la photo dans `static/images/team/` :

```bash
cp photo-mamadou.jpg static/images/team/mamadou-kone.jpg
```

### Étape 2 : Mettre à jour le profil

Deux options :

**Option A : Via MCP**
```
Mets à jour le profil de Mamadou Koné avec l'image /images/team/mamadou-kone.jpg
```

**Option B : Édition manuelle**
Ouvrez `content/equipe/mamadou-kone.md` et modifiez :

```yaml
card:
  image: "/images/team/mamadou-kone.jpg"
```

## Cas d'usage avancés

### Créer un profil de fondateur complet

Pour un membre fondateur avec toutes les informations :

```
Crée le profil de Hammadoun Dicko, membre fondateur de Leidimen :
- Fonction : Président fondateur
- Ville : Douentza
- Pays : Mali
- Email : hammadoun@leidimen.fr
- Devise : "L'éducation transforme les villages"
- Spécialités : Développement local, Gestion de projet, Relations communautaires
- Présentation : Originaire de Douentza, Hammadoun a fondé Leidimen en 2000 
  pour soutenir l'éducation et le développement dans sa région natale.

Biographie complète :
Hammadoun Dicko est né à Douentza et a consacré sa vie au développement 
de sa région. Après des études en France, il a créé l'association Leidimen 
pour créer un pont entre les villages maliens et la diaspora française.

Sous sa direction, Leidimen a construit 15 écoles, formé 200 enseignants 
et soutenu plus de 3000 élèves dans la région de Douentza.
```

Claude créera un profil riche et détaillé automatiquement.

### Ajouter plusieurs membres d'un coup

Vous pouvez créer plusieurs profils en une seule conversation :

```
Ajoute ces 3 nouveaux adhérents :

1. Sophie Dubois - Responsable communication - Paris
2. Karim Traoré - Coordinateur Mali - Bamako
3. Claire Petit - Chargée de projets - Toulouse

Tous sont des adhérents actifs
```

Claude créera les 3 fichiers séquentiellement avec les informations fournies.

### Vérifier les profils existants

Pour voir tous les membres de l'équipe :

```
Liste tous les membres de l'équipe
```

Claude utilisera `list-content` avec le type `equipe` pour afficher :
- Noms et fonctions
- Statuts (fondateur, bureau, etc.)
- Chemins des fichiers

## Personnaliser la biographie

La section **body** du fichier permet d'ajouter une biographie détaillée en Markdown.

### Format recommandé

```markdown
## [Nom du membre]

### Parcours

[Résumé du parcours professionnel et personnel]

### Engagement avec Leidimen

[Comment et pourquoi la personne s'est engagée]

### Réalisations clés

- Projet 1 réalisé
- Projet 2 en cours
- Impact sur les villages

### Vision

[Citation ou vision pour l'association]
```

### Exemple de biographie enrichie

```markdown
## Fatou Sanogo

### Parcours

Fatou est diplômée en développement international de Sciences Po Paris. 
Originaire de Bamako, elle a travaillé 10 ans pour des ONG internationales 
avant de rejoindre Leidimen.

### Engagement avec Leidimen

"J'ai découvert Leidimen lors d'une mission à Douentza en 2018. L'approche 
participative et le respect des communautés locales m'ont immédiatement 
séduite. J'ai rejoint le bureau en 2020 pour coordonner nos projets santé."

### Réalisations clés

- Mise en place de 5 centres de santé dans la région de Douentza
- Formation de 30 agents de santé communautaires
- Programme de sensibilisation touchant 10 000 personnes

### Vision

"Notre objectif est de rendre chaque village autonome en matière de santé 
de base. L'éducation sanitaire transforme des vies."
```

## Mise à jour d'un profil existant

Pour modifier un profil déjà créé :

### Via l'outil update-frontmatter

```
Mets à jour le profil de Marie Martin :
- Nouvelle fonction : Vice-présidente
- Nouveau statut : bureau
- Ajoute la spécialité "Levée de fonds"
```

Claude utilisera `update-frontmatter` pour modifier seulement les champs spécifiés.

### Lecture avant modification

Pour voir le contenu actuel :

```
Montre-moi le profil de Jean Dupont
```

Claude utilisera `get-post-content` pour afficher le frontmatter et le contenu.

## Bonnes pratiques

### ✅ À faire

1. **Photos professionnelles** : Utilisez des photos de bonne qualité (300x300 minimum)
2. **Descriptions claires** : Expliquez le rôle concrètement
3. **Coordonnées précises** : Email professionnel de préférence
4. **Spécialités pertinentes** : Listez les compétences utiles à l'association
5. **Biographies authentiques** : Racontez l'histoire vraie de l'engagement

### ❌ À éviter

1. **Photos floues ou pixelisées**
2. **Descriptions vagues** : "S'occupe de tout" → ❌
3. **Informations personnelles sensibles** : Adresse complète, téléphone personnel
4. **Statut incorrect** : Vérifier fondateur/bureau/adherent/bienfaiteur
5. **Slug en double** : Vérifier qu'il n'existe pas déjà

## Workflow complet recommandé

### 1. Préparation

Rassemblez les informations :
- ☑️ Nom complet
- ☑️ Fonction dans l'association
- ☑️ Statut (fondateur/bureau/adherent/bienfaiteur)
- ☑️ Photo (300x300px minimum, format JPG/PNG)
- ☑️ Coordonnées (ville, pays, email)
- ☑️ Courte présentation (1-2 phrases)
- ☑️ Biographie détaillée (optionnel)

### 2. Création via MCP

```
Crée un profil pour [Nom] avec toutes les infos...
```

### 3. Ajout de la photo

```bash
# Copier la photo dans le bon dossier
cp photo.jpg static/images/team/prenom-nom.jpg

# Mettre à jour via MCP
"Mets à jour l'image de profil de [Nom]"
```

### 4. Vérification locale

```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:1313/leidimen/equipe/
```

### 5. Validation et publication

```bash
# Vérifier les erreurs
git add .
git commit -m "Ajout profil équipe : [Nom]"
git push origin main
```

## Structure de la page équipe

Les profils créés apparaissent automatiquement sur la page `/equipe/` du site grâce au template Hugo `layouts/equipe/single.html`.

### Affichage carte (card)

Le frontmatter `card:` définit l'aperçu dans la grille :
- Photo de profil
- Nom et fonction
- Badges de statut (fondateur, bureau, etc.)
- Ville et pays
- Icônes de contact

### Page individuelle

Chaque membre a sa propre page avec :
- Biographie complète
- Timeline (si `experience:` est défini)
- Compétences (si `skills:` est défini)
- Liens sociaux
- Animations AOS

## Dépannage

### Le fichier existe déjà

**Erreur** : `❌ Team member file already exists: content/equipe/jean-dupont.md`

**Solution** : Le slug est généré automatiquement à partir du nom. Si deux personnes ont le même nom, modifiez légèrement :
- Jean Dupont Paris → `jean-dupont-paris`
- Jean Dupont Lyon → `jean-dupont-lyon`

### Le statut n'est pas reconnu

**Erreur** : Statut "membre" non valide

**Solution** : Utilisez uniquement ces 4 valeurs :
- `fondateur`
- `bureau`
- `adherent`
- `bienfaiteur`

### L'image ne s'affiche pas

**Vérifications** :
1. ✅ Le fichier existe dans `static/images/team/`
2. ✅ Le chemin commence par `/images/team/` (avec le `/` initial)
3. ✅ Le format est JPG, PNG ou WebP
4. ✅ Pas d'espaces dans le nom du fichier (utilisez `-`)

### Le profil n'apparaît pas sur le site

**Causes possibles** :
1. `draft: true` → Changez en `draft: false`
2. Fichier mal placé → Doit être dans `content/equipe/`
3. Frontmatter invalide → Vérifiez la syntaxe YAML
4. Site non rebuilded → Relancez `npm run build`

## Exemples de profils types

### Membre fondateur

```yaml
---
title: "Hammadoun Dicko"
fonction: "Président fondateur"
membre: "fondateur"
ville: "Douentza"
pays: "Mali"
devise: "L'éducation transforme les villages"
specialites: ["Développement local", "Gestion de projet"]
---
```

### Membre du bureau

```yaml
---
title: "Sophie Martin"
fonction: "Trésorière"
membre: "bureau"
ville: "Paris"
pays: "France"
email: "sophie.martin@leidimen.fr"
specialites: ["Comptabilité", "Finance"]
---
```

### Adhérent actif

```yaml
---
title: "Karim Traoré"
fonction: "Coordinateur terrain"
membre: "adherent"
ville: "Bamako"
pays: "Mali"
specialites: ["Logistique", "Suivi de projet"]
---
```

### Bienfaiteur

```yaml
---
title: "Entreprise XYZ"
fonction: "Partenaire mécénat"
membre: "bienfaiteur"
ville: "Lyon"
pays: "France"
---
```

## Outils MCP pour la gestion d'équipe

| Commande | Outil MCP | Résultat |
|----------|-----------|----------|
| "Crée un profil pour [Nom]" | `create-team-member` | Nouveau fichier dans content/equipe/ |
| "Liste tous les membres" | `list-content` type=equipe | Affiche tous les profils |
| "Cherche les membres à Paris" | `search-content` | Trouve par ville/pays |
| "Affiche le profil de [Nom]" | `get-post-content` | Lit le fichier complet |
| "Mets à jour [Nom]" | `update-frontmatter` | Modifie les métadonnées |
| "Valide les profils" | `validate-content` | Vérifie la cohérence |

## Aller plus loin

### Ajouter une timeline

Pour afficher le parcours du membre :

```yaml
experience:
  - year: "2020"
    title: "Trésorier"
    company: "Leidimen"
  - year: "2015"
    title: "Adhérent"
    company: "Leidimen"
```

### Ajouter des compétences

Pour afficher une jauge de compétences :

```yaml
skills:
  - "Gestion de projet"
  - "Finance"
  - "Communication"
```

### Liens sociaux

```yaml
card:
  social:
    - icon: "envelope"
      link: "mailto:contact@example.com"
    - icon: "linkedin"
      link: "https://linkedin.com/in/..."
    - icon: "twitter"
      link: "https://twitter.com/..."
```

## Conclusion

Le serveur MCP Hugo simplifie radicalement la gestion de l'équipe Leidimen. Plus besoin de :
- Créer manuellement les fichiers
- Formater le frontmatter YAML
- Générer les slugs
- Vérifier la syntaxe

Tout se fait en **langage naturel** avec Claude, en quelques secondes.

### Prochaines étapes

1. ✅ Configurez le serveur MCP (voir [guide MCP](../guide-creation-post-mcp/))
2. ✅ Testez avec `Crée un profil de test`
3. ✅ Ajoutez de vrais profils pour l'équipe actuelle
4. ✅ Personnalisez avec photos et biographies détaillées

**Ressources** :
- [Documentation MCP officielle](https://modelcontextprotocol.io)
- [Code source serveur MCP Hugo](https://github.com/hdicko/leidimen/tree/main/hugo-mcp-server)
- [Template équipe Leidimen](https://github.com/hdicko/leidimen/tree/main/layouts/equipe)

---

*Ce guide a été créé avec le serveur MCP Hugo pour vous aider à gérer efficacement l'équipe Leidimen. Bonne création de profils ! 👥*
