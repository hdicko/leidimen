#!/bin/bash

# Leidimen CMS - Quick Start Script

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║       🏛️  LEIDIMEN CMS - Interface Web Setup 🚀           ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé."
    echo "   Installer Node.js depuis: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "   Assurez-vous d'être dans le dossier cms-web/"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Fichier .env non trouvé"
    echo ""
    echo "Configuration requise:"
    echo "----------------------"
    
    # Copy .env.example
    cp .env.example .env
    
    echo "📝 Un fichier .env a été créé depuis .env.example"
    echo ""
    echo "⚙️  Configuration nécessaire:"
    echo ""
    echo "1. Obtenir un token GitHub:"
    echo "   - Aller sur: https://github.com/settings/tokens"
    echo "   - Cliquer sur 'Generate new token (classic)'"
    echo "   - Cocher la permission 'repo'"
    echo "   - Copier le token généré"
    echo ""
    echo "2. Éditer le fichier .env:"
    echo "   nano .env"
    echo ""
    echo "3. Remplacer 'your_github_token_here' par votre token"
    echo ""
    read -p "Appuyez sur Entrée après avoir configuré le token..."
fi

# Verify GITHUB_TOKEN is set
if grep -q "your_github_token_here" .env; then
    echo ""
    echo "⚠️  ATTENTION: Le token GitHub n'a pas été configuré dans .env"
    echo "   Le serveur va démarrer mais les opérations GitHub échoueront."
    echo ""
    read -p "Continuer quand même? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Annulé"
        exit 1
    fi
fi

echo ""
echo "🚀 Démarrage du serveur..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the server
npm start
