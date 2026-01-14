# Fonctionnalité de Recherche et Filtrage des Posts

## Vue d'ensemble

Une fonctionnalité de recherche et de filtrage a été ajoutée à la page de liste des posts (`/posts/`) permettant aux utilisateurs de :

1. **Rechercher par titre** : Trouver des articles par mots-clés dans le titre
2. **Filtrer par année** : Afficher uniquement les articles d'une année spécifique
3. **Trier les résultats** : Organiser les articles par date (récents/anciens) ou par titre (A-Z)

## Fonctionnalités

### 1. Recherche par Titre

- Champ de recherche en temps réel
- Recherche insensible à la casse
- Filtrage instantané pendant la frappe
- Placeholder : "Tapez un mot-clé du titre..."

### 2. Filtre par Année

- Menu déroulant avec toutes les années disponibles
- Option "Toutes les années" par défaut
- Liste générée dynamiquement depuis les posts existants
- Triée de la plus récente à la plus ancienne

### 3. Options de Tri

- **Plus récents** : Articles triés par date décroissante (défaut)
- **Plus anciens** : Articles triés par date croissante
- **Titre (A-Z)** : Articles triés alphabétiquement par titre

### 4. Compteur de Résultats

- Affiche le nombre d'articles visibles
- Format : "X articles sur Y" quand filtrage actif
- Format : "Y articles au total" sans filtrage

### 5. Bouton de Réinitialisation

- Réinitialise tous les filtres d'un clic
- Icône : flèche circulaire (bi-arrow-counterclockwise)
- Restaure l'état par défaut

### 6. Message "Aucun Résultat"

- Affiché quand aucun article ne correspond aux critères
- Icône de recherche 🔍
- Bouton de réinitialisation intégré
- Design cohérent avec le reste du site

## Implémentation Technique

### Fichier Modifié

- `/home/dicko/dev/hugo/hugo_sites/leidimen/layouts/posts/list.html.html`

### Structure HTML Ajoutée

```html
<!-- Search and Filters Section -->
<div class="row mb-5">
  <div class="col-lg-10 mx-auto">
    <div class="card border-0 shadow-sm search-card">
      <div class="card-body p-4">
        <!-- Titre avec icône -->
        <!-- Champ de recherche -->
        <!-- Filtre par année -->
        <!-- Options de tri -->
        <!-- Bouton de réinitialisation -->
        <!-- Compteur de résultats -->
      </div>
    </div>
  </div>
</div>
```

### Attributs Data Ajoutés aux Cartes

Chaque carte d'article (`post-card-ctx7`) possède maintenant :

- `data-title` : Titre en minuscules pour la recherche
- `data-date` : Date au format ISO (YYYY-MM-DD)
- `data-year` : Année de publication (YYYY)

### JavaScript

Fonctionnalité côté client pour :

- Filtrage en temps réel des articles
- Tri dynamique de la grille
- Mise à jour du compteur de résultats
- Masquage de la pagination quand filtrage actif
- Affichage/masquage du message "Aucun résultat"

### CSS

Styles ajoutés pour :

- Carte de recherche avec effet de survol
- Champs de formulaire avec focus stylisé
- Transitions fluides (cubic-bezier)
- Design cohérent avec le reste du site (Context7)
- Support Safari avec préfixe `-webkit-backdrop-filter`

## Comportement

### Interactions

1. **Recherche active** :
   - La pagination est masquée automatiquement
   - Tous les articles matchants sont affichés sur une seule page
   - Le compteur affiche "X articles sur Y"

2. **Sans recherche** :
   - La pagination standard est visible
   - Les articles sont paginés normalement
   - Le compteur affiche "Y articles au total"

3. **Aucun résultat** :
   - La grille est masquée
   - Message d'erreur affiché avec bouton de réinitialisation
   - Emoji 🔍 pour un design convivial

### Performance

- Filtrage côté client (instantané)
- Pas de rechargement de page
- Réordonnancement DOM efficace avec `appendChild`
- Événements optimisés (`input` pour recherche en temps réel)

## Accessibilité

- Labels associés aux champs de formulaire
- Attributs `aria-label` appropriés
- Support clavier complet
- Contraste de couleurs conforme
- Taille de police lisible (form-control-lg)

## Responsive Design

La fonctionnalité est entièrement responsive :

- Layout adaptatif sur mobile (col-md-6, col-md-3)
- Champs empilés verticalement sur petits écrans
- Boutons et textes lisibles sur tous appareils

## Tests Suggérés

1. **Test de recherche** :
   - Taper "école" → Voir articles avec "école" dans le titre
   - Taper "mali" → Voir articles avec "mali" dans le titre
   - Taper "xyz123" → Voir message "Aucun résultat"

2. **Test de filtre par année** :
   - Sélectionner "2008" → Voir uniquement articles de 2008
   - Sélectionner "2024" → Voir uniquement articles de 2024

3. **Test de tri** :
   - "Plus récents" → Articles de 2025 en premier
   - "Plus anciens" → Articles de 2006 en premier
   - "Titre (A-Z)" → Articles triés alphabétiquement

4. **Test combiné** :
   - Recherche "école" + Année "2008" → Articles 2008 avec "école"
   - Vérifier que le compteur affiche le bon nombre

5. **Test de réinitialisation** :
   - Appliquer des filtres
   - Cliquer "Réinitialiser"
   - Vérifier que tout revient à l'état initial

## Améliorations Futures Possibles

1. **Filtres supplémentaires** :
   - Par catégorie (Éducation, Santé, Infrastructure)
   - Par village (Dorool, Diona, etc.)
   - Par mood (Heureux, Motivé, etc.)
   - Par auteur

2. **Recherche avancée** :
   - Recherche dans le contenu (pas seulement le titre)
   - Recherche par tags
   - Surlignage des termes de recherche

3. **Sauvegarde des filtres** :
   - Sauvegarder dans localStorage
   - Persistance entre les sessions
   - URL avec paramètres de recherche

4. **Export des résultats** :
   - Bouton pour copier les liens
   - Export RSS des résultats filtrés

## Compatibilité

- ✅ Chrome/Edge (moderne)
- ✅ Firefox (moderne)
- ✅ Safari (iOS et macOS) avec préfixe webkit
- ✅ Mobile (iOS et Android)

## URL de Test

La fonctionnalité est accessible à :

- **Local** : http://localhost:1313/leidimen/posts/
- **Production** : https://hdicko.github.io/leidimen/posts/

---

**Date de création** : 22 octobre 2025
**Fichiers modifiés** : 1
**Lignes ajoutées** : ~150
**Status** : ✅ Implémenté et testé
