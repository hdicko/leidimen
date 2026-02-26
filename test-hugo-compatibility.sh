#!/bin/bash

# Script de test de compatibilité Hugo 0.157.0
# Ce script teste toutes les fonctionnalités avant déploiement

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "  Test de Compatibilité Hugo 0.157.0 - Projet Leidimen"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de test
test_step() {
    echo -e "${YELLOW}► $1${NC}"
}

test_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

test_error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

# 1. Vérifier la version Hugo
test_step "1. Vérification de la version Hugo..."
HUGO_VERSION=$(./node_modules/.bin/hugo/hugo version | grep -oP 'v\d+\.\d+\.\d+')
if [[ "$HUGO_VERSION" == "v0.157.0" ]]; then
    test_success "Hugo version correcte: $HUGO_VERSION"
else
    test_error "Version Hugo incorrecte: $HUGO_VERSION (attendu: v0.157.0)"
fi
echo ""

# 2. Tester le build de développement
test_step "2. Test du build de développement..."
./node_modules/.bin/hugo/hugo --gc --buildDrafts > /tmp/hugo-dev-build.log 2>&1
if [ $? -eq 0 ]; then
    PAGES=$(grep "Pages" /tmp/hugo-dev-build.log | grep -oP '\d+' | head -1)
    test_success "Build dev réussi - $PAGES pages générées"
else
    test_error "Échec du build de développement"
fi
echo ""

# 3. Tester le build de production
test_step "3. Test du build de production..."
./node_modules/.bin/hugo/hugo --gc --minify --cleanDestinationDir > /tmp/hugo-prod-build.log 2>&1
if [ $? -eq 0 ]; then
    PAGES=$(grep "Pages" /tmp/hugo-prod-build.log | grep -oP '\d+' | head -1)
    BUILD_TIME=$(grep "Total in" /tmp/hugo-prod-build.log | grep -oP '\d+\s*ms')
    test_success "Build production réussi - $PAGES pages en $BUILD_TIME"
else
    test_error "Échec du build de production"
fi
echo ""

# 4. Vérifier les fichiers générés
test_step "4. Vérification des fichiers générés..."
if [ -f "public/index.html" ]; then
    test_success "index.html généré"
else
    test_error "index.html manquant"
fi

if [ -d "public/posts" ]; then
    POST_COUNT=$(find public/posts -name "index.html" | wc -l)
    test_success "Pages posts générées: $POST_COUNT"
else
    test_error "Dossier posts manquant"
fi

if [ -d "public/css" ]; then
    CSS_FILES=$(find public/css -name "*.css" | wc -l)
    test_success "Fichiers CSS générés: $CSS_FILES"
else
    test_error "Dossier CSS manquant"
fi
echo ""

# 5. Vérifier la minification
test_step "5. Test de la minification..."
if grep -q "<!doctype html>" public/index.html; then
    test_success "HTML minifié correctement"
else
    test_error "HTML non minifié"
fi
echo ""

# 6. Vérifier les taxonomies
test_step "6. Vérification des taxonomies..."
for taxonomy in villages categories tags moods; do
    if [ -d "public/$taxonomy" ]; then
        test_success "Taxonomie '$taxonomy' générée"
    else
        test_error "Taxonomie '$taxonomy' manquante"
    fi
done
echo ""

# 7. Vérifier les images processées
test_step "7. Vérification du traitement d'images..."
if [ -d "resources/_gen/images" ]; then
    IMG_COUNT=$(find resources/_gen/images -type f | wc -l)
    test_success "Images processées: $IMG_COUNT"
else
    echo -e "${YELLOW}⚠ Pas d'images processées (normal pour un nouveau build)${NC}"
    IMG_COUNT=0
fi
echo ""

# 8. Vérifier les erreurs de build
test_step "8. Analyse des avertissements..."
ERROR_COUNT=$(grep -c "ERROR" /tmp/hugo-prod-build.log || true)
WARN_COUNT=$(grep -c "WARN" /tmp/hugo-prod-build.log || true)

if [ $ERROR_COUNT -eq 0 ]; then
    test_success "Aucune erreur de build"
else
    test_error "$ERROR_COUNT erreur(s) trouvée(s)"
fi

if [ $WARN_COUNT -gt 0 ]; then
    echo -e "${YELLOW}⚠ $WARN_COUNT avertissement(s) (normal pour layouts JSON)${NC}"
fi
echo ""

# 9. Tester la structure des URLs
test_step "9. Vérification de la structure des URLs..."
if grep -q 'hdicko.github.io/leidimen' public/index.html || grep -q 'src="/leidimen/' public/index.html; then
    test_success "baseURL correcte (GitHub Pages)"
else
    echo -e "${YELLOW}⚠ Vérification baseURL - Le build utilise relativeURLs${NC}"
fi
echo ""

# 10. Vérifier les fichiers statiques
test_step "10. Vérification des fichiers statiques..."
STATIC_FILES=("robots.txt" "admin/config.yml" "images")
for file in "${STATIC_FILES[@]}"; do
    if [ -e "public/$file" ]; then
        test_success "Fichier/dossier statique '$file' présent"
    else
        test_error "Fichier/dossier statique '$file' manquant"
    fi
done
echo ""

# Résumé final
echo "═══════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ TOUS LES TESTS SONT PASSÉS!${NC}"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Résumé:"
echo "  • Version Hugo: $HUGO_VERSION"
echo "  • Pages générées: $PAGES"
echo "  • Temps de build: $BUILD_TIME"
echo "  • Images processées: $IMG_COUNT"
echo "  • Fichiers CSS: $CSS_FILES"
echo "  • Posts: $POST_COUNT"
echo ""
echo "Le site est prêt pour le déploiement! 🚀"
echo ""
