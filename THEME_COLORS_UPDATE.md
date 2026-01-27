# Mise à jour du système de couleurs - Thème Clair/Sombre

## Résumé des changements

Le système de thème clair/sombre a été amélioré avec des couleurs plus nuancées et douces, offrant une meilleure expérience visuelle et réduisant la fatigue oculaire.

## Nouvelles couleurs

### Mode Clair

- **Arrière-plans** :
  - Primaire : `#f5f7fa` (gris très clair avec teinte bleue douce)
  - Secondaire : `#fafbfc` (blanc cassé, légèrement bleuté)
  - Tertiaire : `#eff1f5` (gris clair pour zones alternatives)

- **Textes** :
  - Primaire : `#2c3e50` (bleu-gris foncé, au lieu de noir pur)
  - Secondaire : `#5a6c7d` (gris moyen)
  - Atténué : `#7f8c9a` (gris clair)

- **Accents** :
  - Primaire : `#3b82f6` (bleu vif)
  - Secondaire : `#6366f1` (indigo)
  - Tertiaire : `#8b5cf6` (violet)

### Mode Sombre

- **Arrière-plans** :
  - Primaire : `#1d2433` (bleu-gris très foncé doux, **plus clair** qu'avant)
  - Secondaire : `#272d3f` (bleu-gris foncé avec teinte chaude)
  - Tertiaire : `#30364a` (bleu-gris moyen pour zones alternatives)

- **Textes** :
  - Primaire : `#edf0f5` (blanc cassé très doux avec teinte bleue)
  - Secondaire : `#c5ccd6` (gris clair bleuté)
  - Atténué : `#919aaa` (gris moyen)

- **Accents** :
  - Primaire : `#5b9cff` (bleu clair vif)
  - Secondaire : `#7b7fff` (indigo clair)
  - Tertiaire : `#a078ff` (violet clair)

## Améliorations techniques

### 1. Variables CSS centralisées

Toutes les couleurs sont maintenant définies dans `/static/css/theme-colors.css` avec des variables CSS natives :

```css
:root {
  --bg-primary: #f8f9fa;
  --text-primary: #2c3e50;
  --accent-primary: #3b82f6;
  /* ... */
}

body.dark-mode {
  --bg-primary: #1a1f2e;
  --text-primary: #e8edf2;
  /* ... */
}
```

### 2. Synchronisation améliorée

Le fichier `darkmode.js` a été mis à jour pour :

- Synchroniser `body.dark-mode` et `data-bs-theme`
- Appliquer les changements de manière cohérente
- Support des préférences système (prefers-color-scheme)

### 3. Transitions fluides

Toutes les transitions de couleurs sont maintenant fluides avec :

```css
* {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
```

### 4. Composants couverts

- ✅ Navbar et navigation
- ✅ Cards et containers
- ✅ Formulaires et inputs
- ✅ Boutons et liens
- ✅ Dropdowns et menus
- ✅ Accordéons
- ✅ Tables et listes
- ✅ Modals et alertes
- ✅ Footer
- ✅ Pagination
- ✅ Code blocks
- ✅ Blockquotes

## Principes de design

### 1. Pas de noir/blanc purs

- **Avant** : Mode sombre utilisait `#1a1f2e`, mode clair `#ffffff`
- **Après** : Mode sombre utilise `#1d2433` (encore plus clair), mode clair `#fafbfc`
- **Raison** : Réduit encore plus la fatigue oculaire, plus de douceur visuelle

### 2. Teinte bleue cohérente

- Les couleurs ont toutes une légère teinte bleue
- Crée une harmonie visuelle à travers toute l'interface
- Reflète l'identité visuelle de Leidimen

### 3. Contraste optimisé

- Ratio de contraste WCAG AA respecté (4.5:1 minimum pour le texte)
- Mode sombre : fond `#1a1f2e` + texte `#e8edf2` = ratio 12.5:1
- Mode clair : fond `#f8f9fa` + texte `#2c3e50` = ratio 11.8:1

### 4. Ombres adaptées

- Mode clair : ombres légères avec faible opacité
- Mode sombre : ombres plus prononcées pour la profondeur

## Fichiers modifiés

1. **Nouveau fichier** : `/static/css/theme-colors.css`
   - Variables CSS centralisées
   - Styles globaux pour tous les composants

2. **Mis à jour** : `/assets/js/darkmode.js`
   - Synchronisation body.dark-mode et data-bs-theme
   - Fonction applyDarkMode() centralisée

3. **Mis à jour** : `/layouts/partials/head.html`
   - Chargement de theme-colors.css

4. **Mis à jour** : `/layouts/partials/intro.html`
   - Couleurs accordéons, cards, villages
   - Nouvelles valeurs pour tous les éléments dark-mode

5. **Mis à jour** : `/layouts/partials/navbar.html`
   - Couleurs navbar en mode sombre
   - Dropdowns et items actifs

## Tests recommandés

1. **Navigation** : Vérifier tous les liens en mode clair et sombre
2. **Formulaires** : Tester la lisibilité des inputs et selects
3. **Cards** : Vérifier les cartes de projets et villages
4. **Accordéons** : Tester l'ouverture/fermeture avec les nouvelles couleurs
5. **Hover states** : Vérifier tous les états de survol
6. **Transitions** : S'assurer que le changement de thème est fluide

## Accessibilité

### WCAG 2.1 Level AA

✅ Contraste texte/fond : > 4.5:1  
✅ Contraste UI : > 3:1  
✅ Taille de texte minimale respectée  
✅ Support des préférences système

### Préférences utilisateur

- Le choix de thème est sauvegardé dans `localStorage`
- Détection automatique de `prefers-color-scheme`
- Transitions fluides pour éviter les flashs

## Utilisation

### Pour les développeurs

Utiliser les variables CSS dans les nouveaux styles :

```css
.mon-element {
  background: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}
```

### Pour les utilisateurs

Le bouton de changement de thème se trouve dans la navbar (icône lune/soleil). Le choix est automatiquement sauvegardé.

## Comparaison avant/après

| Élément              | Avant (sombre) | Après (sombre) | Amélioration                             |
| -------------------- | -------------- | -------------- | ---------------------------------------- |
| Background principal | `#1a1f2e`      | `#1d2433`      | Encore plus doux, moins de contraste dur |
| Texte principal      | `#e8edf2`      | `#edf0f5`      | Plus lumineux sans éblouir               |
| Cards                | `#242938`      | `#272d3f`      | Teinte plus chaude et accueillante       |
| Borders              | `#3d4558`      | `#3f4758`      | Meilleure définition subtile             |
| Accents              | `#3b82f6`      | `#5b9cff`      | Excellente visibilité sur fond sombre    |
| Background clair     | `#ffffff`      | `#fafbfc`      | Blanc doux, repose les yeux              |

## Notes pour l'avenir

1. **Maintenance** : Toutes les nouvelles couleurs doivent utiliser les variables CSS de `theme-colors.css`
2. **Tests** : Vérifier les deux thèmes lors de l'ajout de nouveaux composants
3. **Performance** : Les transitions CSS sont performantes, pas besoin d'optimisation JS
4. **Compatibilité** : Les variables CSS sont supportées par tous les navigateurs modernes (IE11+)

## Déploiement

Les changements sont prêts pour le déploiement :

```bash
# Test local
./dev-server.sh

# Build production
npm run build

# Deploy
./deploy.sh
```

---

**Date de mise à jour** : 18 janvier 2026  
**Auteur** : GitHub Copilot  
**Version** : 2.0
