#!/bin/bash

# Script pour configurer le token GitHub

echo "═══════════════════════════════════════════════════════════"
echo "        Configuration du Token GitHub - Leidimen CMS"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Vérifier si .env existe
if [ ! -f ".env" ]; then
    echo "❌ Fichier .env non trouvé!"
    echo "   Création depuis .env.example..."
    cp .env.example .env
    echo "✅ Fichier .env créé"
    echo ""
fi

echo "🔐 Pour créer un nouveau token GitHub:"
echo ""
echo "1. Ouvrir: https://github.com/settings/tokens"
echo "2. Cliquer sur 'Generate new token (classic)'"
echo "3. Nom: leidimen-cms-web"
echo "4. Cocher la permission: repo"
echo "5. Copier le token généré (commence par ghp_)"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Demander le token
read -p "Collez votre token GitHub ici: " NEW_TOKEN

if [ -z "$NEW_TOKEN" ]; then
    echo "❌ Aucun token fourni. Annulation."
    exit 1
fi

# Valider le format du token
if [[ ! "$NEW_TOKEN" =~ ^ghp_ ]]; then
    echo "⚠️  Attention: Le token ne commence pas par 'ghp_'"
    read -p "Voulez-vous continuer quand même? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Annulé"
        exit 1
    fi
fi

# Mettre à jour le fichier .env
sed -i "s|GITHUB_TOKEN=.*|GITHUB_TOKEN=$NEW_TOKEN|" .env

echo ""
echo "✅ Token mis à jour dans .env"
echo ""

# Tester le token
echo "🧪 Test du token..."
RESPONSE=$(curl -s -H "Authorization: token $NEW_TOKEN" https://api.github.com/user)
USERNAME=$(echo "$RESPONSE" | grep -o '"login": "[^"]*' | cut -d'"' -f4)

if [ -n "$USERNAME" ]; then
    echo "✅ Token valide! Connecté en tant que: $USERNAME"
    echo ""
    echo "🎉 Configuration terminée!"
    echo ""
    echo "Pour démarrer le serveur:"
    echo "  npm start"
    echo ""
else
    ERROR=$(echo "$RESPONSE" | grep -o '"message": "[^"]*' | cut -d'"' -f4)
    echo "❌ Token invalide: $ERROR"
    echo ""
    echo "Veuillez créer un nouveau token avec la permission 'repo'"
    exit 1
fi
