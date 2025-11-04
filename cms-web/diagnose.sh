#!/bin/bash

# Script de diagnostic pour le CMS Web

echo "═══════════════════════════════════════════════════════════"
echo "           Diagnostic Leidimen CMS Web"
echo "═══════════════════════════════════════════════════════════"
echo ""

# 1. Vérifier Node.js
echo "1️⃣  Vérification de Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   ✅ Node.js installé: $NODE_VERSION"
else
    echo "   ❌ Node.js non installé!"
    echo "      Installer: https://nodejs.org/"
fi
echo ""

# 2. Vérifier npm
echo "2️⃣  Vérification de npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "   ✅ npm installé: v$NPM_VERSION"
else
    echo "   ❌ npm non installé!"
fi
echo ""

# 3. Vérifier les dépendances
echo "3️⃣  Vérification des dépendances..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules présent"
    if [ -f "node_modules/express/package.json" ]; then
        echo "   ✅ express installé"
    else
        echo "   ❌ express manquant - Exécuter: npm install"
    fi
else
    echo "   ❌ node_modules absent - Exécuter: npm install"
fi
echo ""

# 4. Vérifier le fichier .env
echo "4️⃣  Vérification du fichier .env..."
if [ -f ".env" ]; then
    echo "   ✅ Fichier .env présent"
    
    if grep -q "GITHUB_TOKEN=ghp_" .env; then
        TOKEN=$(grep GITHUB_TOKEN .env | cut -d'=' -f2)
        TOKEN_LENGTH=${#TOKEN}
        echo "   ✅ Token GitHub configuré (longueur: $TOKEN_LENGTH)"
        
        # Tester le token
        echo "   🧪 Test du token..."
        RESPONSE=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/user)
        USERNAME=$(echo "$RESPONSE" | grep -o '"login": "[^"]*' | cut -d'"' -f4)
        
        if [ -n "$USERNAME" ]; then
            echo "   ✅ Token valide - Utilisateur: $USERNAME"
        else
            ERROR=$(echo "$RESPONSE" | grep -o '"message": "[^"]*' | cut -d'"' -f4)
            echo "   ❌ Token invalide: $ERROR"
            echo "      Exécuter: ./configure-token.sh"
        fi
    elif grep -q "your_github_token_here" .env; then
        echo "   ⚠️  Token non configuré (valeur par défaut)"
        echo "      Exécuter: ./configure-token.sh"
    else
        echo "   ❌ GITHUB_TOKEN manquant dans .env"
    fi
else
    echo "   ❌ Fichier .env absent"
    echo "      Exécuter: cp .env.example .env"
fi
echo ""

# 5. Vérifier le port
echo "5️⃣  Vérification du port 3000..."
if lsof -i:3000 &> /dev/null; then
    PID=$(lsof -t -i:3000)
    echo "   ⚠️  Port 3000 déjà utilisé (PID: $PID)"
    ps -p $PID -o comm= | head -1 | xargs echo "      Processus:"
else
    echo "   ✅ Port 3000 disponible"
fi
echo ""

# 6. Vérifier les fichiers principaux
echo "6️⃣  Vérification des fichiers..."
FILES=("index.html" "server.js" "app.js" "styles.css" "package.json")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file manquant!"
    fi
done
echo ""

# 7. Résumé
echo "═══════════════════════════════════════════════════════════"
echo "                      RÉSUMÉ"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Vérifier si tout est OK
ALL_OK=true

if ! command -v node &> /dev/null; then
    echo "❌ Installer Node.js"
    ALL_OK=false
fi

if [ ! -d "node_modules" ]; then
    echo "❌ Exécuter: npm install"
    ALL_OK=false
fi

if [ ! -f ".env" ] || grep -q "your_github_token_here" .env; then
    echo "❌ Configurer le token: ./configure-token.sh"
    ALL_OK=false
elif [ -f ".env" ]; then
    TOKEN=$(grep GITHUB_TOKEN .env | cut -d'=' -f2)
    RESPONSE=$(curl -s -H "Authorization: token $TOKEN" https://api.github.com/user)
    if ! echo "$RESPONSE" | grep -q '"login"'; then
        echo "❌ Token invalide: ./configure-token.sh"
        ALL_OK=false
    fi
fi

if [ "$ALL_OK" = true ]; then
    echo "✅ Tout est prêt!"
    echo ""
    echo "Pour démarrer le serveur:"
    echo "  npm start"
    echo ""
    echo "Puis ouvrir: http://localhost:3000"
else
    echo ""
    echo "⚠️  Veuillez corriger les erreurs ci-dessus"
fi

echo ""
