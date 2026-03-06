# Tutoriel : Publier un article sur le site Leidimen

**Durée estimée :** 10–15 minutes  
**Niveau :** Débutant — aucune compétence technique requise  
**Résultat :** À la fin de ce tutoriel, votre article sera publié sur le site et visible par tous les visiteurs.

---

## Avant de commencer

### Quel outil utiliser ?

Deux interfaces permettent de publier un article. Choisissez celle qui correspond à votre situation :

| | Netlify CMS | cms-web |
|---|---|---|
| **Public visé** | Éditeurs de contenu | Développeurs |
| **Installation** | Aucune — navigateur uniquement | Node.js + token GitHub requis |
| **Upload d'images** | Glisser-déposer | Manuel |
| **Accès** | En ligne, depuis n'importe où | En local uniquement |
| **Recommandé si…** | Vous n'êtes pas développeur | Un développeur a déjà configuré l'outil |

> 👉 **Si vous n'êtes pas développeur, suivez la [Partie A — Netlify CMS](#partie-a--publier-avec-netlify-cms).**

### Ce dont vous avez besoin

- Un accès à Internet et un navigateur web (Chrome, Firefox, Safari…)
- Un compte Netlify Identity avec accès au site Leidimen  
  *(Si vous n'avez pas encore de compte, demandez-le à l'administrateur du site)*
- Le texte de votre article, prêt à être saisi
- Une image de couverture (facultatif, mais vivement recommandé)

---

## Partie A — Publier avec Netlify CMS

### Étape 1 : Se connecter à l'interface d'administration

1. Ouvrez votre navigateur.
2. Accédez à l'adresse :  
   **`https://hdicko.github.io/leidimen/admin/`**
3. Cliquez sur le bouton **« Se connecter avec Netlify Identity »**.
4. Saisissez votre adresse e-mail et votre mot de passe, puis cliquez sur **« Log in »**.

> ✅ **Ce que vous devez voir** : L'interface d'administration s'ouvre avec un menu latéral qui liste les rubriques du site (Articles, Galeries, Équipe…).

> 💡 **Vous avez oublié votre mot de passe ?** Cliquez sur « Forgot password » sur l'écran de connexion et suivez le lien reçu par e-mail.

---

### Étape 2 : Créer un nouvel article

1. Dans le menu latéral, cliquez sur **📝 Articles**.
2. Cliquez sur le bouton **« Nouvel Article »** (en haut à droite).

> ✅ **Ce que vous devez voir** : Un formulaire vide s'affiche, avec les champs à remplir à gauche et un aperçu de l'article à droite.

---

### Étape 3 : Remplir les informations de base

Remplissez les champs dans l'ordre suivant :

**1. Titre** *(obligatoire)*  
Saisissez le titre de votre article. Visez 60 caractères maximum pour un bon référencement sur Google.  
*Exemple : « Construction de l'école de Dorool — Bilan 2025 »*

**2. Date de publication**  
Cliquez sur le champ et sélectionnez la date de votre choix. Par défaut, la date d'aujourd'hui est pré-remplie.

**3. Description courte**  
Rédigez une courte présentation de l'article en 1 à 2 phrases (150–160 caractères recommandés). Ce texte apparaît dans les résultats de recherche Google.  
*Exemple : « Retour sur l'avancement du chantier de l'école primaire de Dorool, projet phare de l'association en 2025. »*

**4. Contenu** *(obligatoire)*  
Rédigez ou collez le texte de votre article dans la zone d'édition. La barre d'outils vous permet de mettre en forme votre texte sans connaître le Markdown :

| Bouton | Effet |
|--------|-------|
| **B** | Texte en **gras** |
| *I* | Texte en *italique* |
| H1 / H2 | Titre de section |
| ≡ | Liste à puces |
| 1. | Liste numérotée |
| « » | Citation |
| 🔗 | Insérer un lien |
| 🖼 | Insérer une image |

> 💡 **Astuce** : L'aperçu à droite se met à jour en temps réel. Vérifiez-y l'apparence de votre article au fur et à mesure.

---

### Étape 4 : Ajouter une image de couverture

1. Faites défiler jusqu'au champ **« Image principale »**.
2. Cliquez sur **« Choose an image »**.
3. Dans la fenêtre qui s'ouvre, cliquez sur **« Upload »**.
4. Sélectionnez votre image depuis votre ordinateur (formats JPG, PNG ou WebP — taille max : 2 Mo).
5. Une fois l'image téléchargée, cliquez sur **« Choose selected »** pour la valider.

> ✅ **Ce que vous devez voir** : Un aperçu miniature de l'image apparaît dans le champ.

> 💡 **Taille idéale** : 1200 × 630 pixels. Cette proportion garantit un affichage optimal sur le site et lors du partage sur les réseaux sociaux.

---

### Étape 5 : Catégoriser l'article

Ces informations permettent aux lecteurs de retrouver votre article par thème ou par village. Elles ne sont pas obligatoires, mais fortement recommandées.

**Villages concernés**  
Cliquez sur le menu déroulant et sélectionnez le ou les villages mentionnés dans l'article :

> Boundoucoli · Darawal · Debere · Diambana · Diona · Dorool · Douentza · Manko · N'Dumpa · Tacouti · Tanal

**Catégories**  
Saisissez la catégorie principale de l'article. Exemples courants :
- `Éducation`
- `Santé`
- `Infrastructure`
- `Actualités`
- `Événements`

**Tags**  
Ajoutez des mots-clés qui décrivent précisément le contenu. Séparez-les par des virgules.  
*Exemple : `école, construction, Mali, 2025`*

**Humeur** *(facultatif)*  
Sélectionnez le ton général de l'article parmi les options proposées :
- **Heureux** — une bonne nouvelle, un succès
- **Inspiré** — un témoignage, une histoire touchante
- **Motivé** — un appel à l'action, une mobilisation
- **Reconnaissant** — des remerciements, un bilan positif
- **Triste** — un deuil, une difficulté

---

### Étape 6 : Publier l'article

1. Vérifiez en haut du formulaire que le champ **« Brouillon »** est **décoché**.  
   *(Si la case est cochée, l'article sera sauvegardé mais restera invisible sur le site.)*
2. Cliquez sur le bouton **« Publish »** en haut à droite.

> ✅ **Ce que vous devez voir** : Un message de confirmation **« Entry published »** s'affiche brièvement. L'article est transmis à GitHub et le site va se reconstruire automatiquement.

> ⏳ **Comptez 2 à 5 minutes** avant que l'article soit visible sur le site public.

---

## Partie B — Publier avec cms-web

> ⚠️ **Cette section s'adresse aux développeurs.** Elle suppose que Node.js est installé et que le fichier `.env` de cms-web a déjà été configuré avec un token GitHub valide. Si ce n'est pas le cas, utilisez la Partie A.

### Étape 1 : Lancer l'interface locale

Ouvrez un terminal dans le dossier `cms-web` du projet et lancez :

```bash
npm start
```

Ouvrez votre navigateur à l'adresse : **`http://localhost:3000`**

### Étape 2 : Remplir le formulaire

Le formulaire propose les mêmes champs que Netlify CMS. Remplissez :

- **Titre**, **Date**, **Description** (150–160 caractères)
- **Contenu** — avec prévisualisation Markdown en temps réel et statistiques de lisibilité (nombre de mots, temps de lecture estimé)
- **Villages**, **Catégories**, **Tags**

### Étape 3 : Soumettre l'article

1. Cliquez sur le bouton **« Publier l'article »**.
2. L'outil envoie directement le fichier sur GitHub via l'API (aucun `git push` requis).

> ✅ **Ce que vous devez voir** : Un message de succès avec un lien vers le commit GitHub. Le site se reconstruit dans les minutes suivantes.

---

## Vérifier que l'article est bien en ligne

Après avoir publié, le site se reconstruit automatiquement. Attendez **2 à 5 minutes**, puis :

1. Ouvrez le site public : **`https://hdicko.github.io/leidimen/`**
2. Cliquez sur la rubrique **Articles** dans le menu.
3. Votre article doit apparaître en tête de liste.

### L'article n'apparaît pas après 10 minutes ?

Voici les causes les plus fréquentes :

| Problème probable | Vérification |
|---|---|
| L'article était en brouillon | Dans Netlify CMS, rouvrez l'article et vérifiez que « Brouillon » est décoché |
| Erreur lors de la reconstruction | Consultez [GitHub Actions](https://github.com/hdicko/leidimen/actions) — le build échoué est signalé en rouge |
| La date est dans le futur | Hugo n'affiche pas les articles dont la date est ultérieure à aujourd'hui (sauf en mode développement) |

---

## Étapes suivantes

Vous savez maintenant publier un article. Pour aller plus loin :

- **Modifier un article** — Dans Netlify CMS, retournez dans *Articles*, cliquez sur l'article à modifier, effectuez vos changements et cliquez sur « Publish ».
- **Créer une galerie photos** — Consultez [`CONTENT_CREATION_GUIDE.md`](./CONTENT_CREATION_GUIDE.md) pour ajouter une galerie avec plusieurs images.
- **Ajouter un membre à l'équipe** — Consultez [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) pour la procédure complète.
