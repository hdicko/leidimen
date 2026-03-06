# Guide pratique : Ajouter un membre de l'équipe

**Type :** How-to Guide  
**Prérequis :** Accès à Netlify CMS *ou* environnement de développement Hugo configuré  
**Résultat :** Le nouveau membre apparaît sur la page `/equipe/` du site avec sa fiche complète.

---

## Vue d'ensemble

Chaque membre de l'équipe correspond à un fichier Markdown dans `content/equipe/`.  
Deux champs sont **obligatoires** ; tous les autres sont optionnels mais recommandés.

| Champ | Obligatoire | Description |
|---|---|---|
| `title` | ✅ | Nom complet du membre |
| `card.membre` | ✅ | Statut : `fondateur`, `bureau`, `adherent`, `bienfaiteur` |
| `card.presentation` | Recommandé | Courte biographie (1–2 phrases) affichée sur la liste |
| `card.image` | Recommandé | Photo (voir section [Ajouter une photo](#ajouter-une-photo)) |
| `card.devise` | Optionnel | Citation ou devise personnelle |
| `card.specialites` | Optionnel | Liste de compétences ou domaines d'expertise |
| `card.ville` / `card.pays` | Optionnel | Localisation |
| `card.email` / `card.linkedin` | Optionnel | Liens de contact |
| `weight` | Optionnel | Ordre d'affichage (plus bas = affiché en premier) |

---

## Méthode A — Via Netlify CMS (navigateur)

### 1. Ouvrir la section Équipe

1. Accédez à l'interface d'administration : **`https://hdicko.github.io/leidimen/admin/`**
2. Connectez-vous avec vos identifiants Netlify Identity.
3. Dans le menu latéral, cliquez sur **👥 Équipe**.
4. Cliquez sur **« Nouveau Membre »**.

### 2. Remplir les champs

**Nom complet** *(obligatoire)*  
Saisissez le prénom et le nom. Ce champ génère aussi le nom du fichier et l'URL du profil.  
*Exemple : `Sophie Dubois` → URL `/equipe/sophie-dubois/`*

**Date d'ajout**  
Laissez la date du jour (pré-remplie automatiquement).

**Informations carte** — dépliez cette section :

| Champ CMS | Ce qu'il contrôle |
|---|---|
| **Photo** | Image affichée sur la carte et la page de profil |
| **Fonction** | Intitulé libre du rôle — ex : *Trésorière*, *Chargé de projets* |
| **Statut** | Sélecteur : `fondateur` / `bureau` / `adherent` / `bienfaiteur` — détermine le badge coloré |
| **Ville / Pays** | Localisation affichée sur le profil |
| **Email** | Adresse de contact (non rendue publique comme lien `mailto:`) |
| **LinkedIn** | URL complète du profil LinkedIn |
| **Devise personnelle** | Citation affichée en italique sur la carte |
| **Spécialités** | Compétences listées sous forme de tags |

**Catégories** *(optionnel)*  
Ajoutez `CA` si le membre fait partie du Conseil d'Administration — cela active un badge distinctif sur sa carte.

**Ordre d'affichage** *(optionnel)*  
Entrez un nombre. Les membres sont affichés du plus petit au plus grand. Valeur par défaut : `100`.

**Biographie** *(optionnel)*  
Rédigez la biographie complète en Markdown. Elle apparaît sur la page de profil individuelle.

### 3. Publier

1. Vérifiez que **« Brouillon »** est décoché.
2. Cliquez sur **« Publish »**.

> ✅ Le membre sera visible sur le site dans les 2 à 5 minutes suivant la publication.

---

## Méthode B — Création manuelle (développeur)

### 1. Créer le fichier

Nommez le fichier en minuscules avec des tirets, placez-le dans `content/equipe/` :

```bash
# Avec l'archétype Hugo
hugo new equipe/prenom-nom.md

# Ou directement
touch content/equipe/prenom-nom.md
```

### 2. Frontmatter minimal

```yaml
---
title: "Prénom Nom"
date: 2025-01-15
card:
  membre: "adherent"
  presentation: "Courte biographie affichée sur la page Équipe."
---
```

### 3. Frontmatter complet (recommandé)

```yaml
---
title: "Prénom Nom"
date: 2025-01-15
weight: 60

card:
  image: "images/prenom-nom.jpg"      # Voir section "Ajouter une photo"
  imageAnchor: "center"               # top | center | bottom | smart
  membre: "adherent"                  # fondateur | bureau | adherent | bienfaiteur
  presentation: "Courte biographie (1–2 phrases) affichée sur la page Équipe."
  devise: "Ma devise personnelle"
  specialites:
    - "Compétence 1"
    - "Compétence 2"
  ville: "Paris"
  pays: "France"
  email: "prenom.nom@example.com"
  linkedin: "https://linkedin.com/in/prenom-nom"

categories:
  - "adherent"   # Ajoutez "CA" pour le badge Conseil d'Administration
---

Biographie complète du membre, rédigée en **Markdown**.

Paragraphes, listes, et liens sont supportés.
```

### 4. Valeurs du champ `card.membre`

| Valeur | Badge affiché | Usage |
|---|---|---|
| `fondateur` | 🟡 Doré | Membres fondateurs de l'association (2007) |
| `bureau` | 🔵 Bleu | Membres du bureau exécutif |
| `adherent` | ⚪ Gris | Membres adhérents actifs |
| `bienfaiteur` | 🟢 Vert | Bienfaiteurs et donateurs |

---

## Ajouter une photo

La photo est **optionnelle** — si elle est absente, un avatar générique s'affiche automatiquement.  
Deux emplacements sont possibles selon la méthode utilisée :

### Via Netlify CMS (upload automatique)

Lorsque vous téléchargez une photo via le champ **Photo** dans l'interface CMS, le fichier est stocké dans `static/images/uploads/` et le chemin est enregistré avec un préfixe `/` :

```
/images/uploads/prenom-nom.jpg
```

Ce chemin est reconnu par le template et utilisé comme **image statique** (sans traitement Hugo).

### Via fichier manuel (développeur)

Pour bénéficier du traitement d'image Hugo (redimensionnement, conversion WebP, optimisation) :

1. Copiez la photo dans **`assets/images/`** :
   ```bash
   cp ~/Bureau/photo.jpg assets/images/prenom-nom.jpg
   ```

2. Référencez-la **sans barre oblique initiale** dans le frontmatter :
   ```yaml
   card:
     image: "images/prenom-nom.jpg"   # ✅ chemin relatif → assets/images/
   ```

> ⚠️ **Ne pas confondre** :  
> - `images/prenom-nom.jpg` → cherche dans `assets/images/` (traitement Hugo)  
> - `/images/uploads/prenom-nom.jpg` → cherche dans `static/images/uploads/` (fichier statique brut)

**Dimensions recommandées :** photo carrée, minimum 400 × 400 pixels.  
**Formats acceptés :** JPG, PNG, WebP.

---

## Contrôler l'ordre d'affichage

Le champ `weight` détermine la position du membre sur la page `/equipe/` :

- **Valeur faible** → affiché en premier (ex : `weight: 10` pour le Président)
- **Valeur élevée** → affiché en dernier (ex : `weight: 100` pour les membres récents)
- **Valeur absente** → trié par date décroissante

```yaml
# Exemple d'ordonnancement
weight: 10   # Président / Fondateurs
weight: 20   # Vice-président / Bureau
weight: 50   # Membres actifs anciens
weight: 100  # Nouveaux membres (défaut)
```

---

## Vérifier le résultat

### En développement local

```bash
./dev-server.sh
# Ouvrir : http://localhost:1313/leidimen/equipe/
```

### En production

Après publication via Netlify CMS ou `git push`, attendez 2 à 5 minutes puis :

1. Ouvrez **`https://hdicko.github.io/leidimen/equipe/`**
2. Le membre doit apparaître dans la liste, filtrable par statut.
3. Cliquez sur sa carte pour accéder à sa page de profil individuelle.

### Le membre n'apparaît pas ?

| Problème probable | Vérification |
|---|---|
| Fichier en brouillon | Vérifiez que `draft: false` (ou champ absent) dans le frontmatter |
| Champ `card.membre` absent | Ce champ est requis pour le filtrage — ajoutez-le |
| Erreur YAML dans le frontmatter | Lancez `npm run build` et lisez le message d'erreur |
| Photo introuvable | Vérifiez que le fichier existe bien dans `assets/images/` ou `static/images/uploads/` |
| Build échoué | Consultez [GitHub Actions](https://github.com/hdicko/leidimen/actions) |

---

## Références

- Template liste équipe : [`layouts/equipe/list.html`](./layouts/equipe/list.html)
- Template profil : [`layouts/equipe/single.html`](./layouts/equipe/single.html)
- Archétype : [`archetypes/about.md`](./archetypes/about.md)
- Config CMS : [`static/admin/config.yml`](./static/admin/config.yml) — section `👥 Équipe`
- Exemple de fiche complète : [`content/equipe/claire-petit.md`](./content/equipe/claire-petit.md)
