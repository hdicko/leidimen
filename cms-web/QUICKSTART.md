# 🚀 Guide de Démarrage Rapide - Leidimen CMS Web

## Installation en 3 minutes

### 1️⃣ Prérequis

- Node.js 16+ installé ([Télécharger](https://nodejs.org/))
- Token GitHub ([Créer un token](https://github.com/settings/tokens))

### 2️⃣ Installation

```bash
cd cms-web
npm install
```

### 3️⃣ Configuration

Créer le fichier `.env` :

```bash
cp .env.example .env
nano .env  # Ou ouvrir avec votre éditeur
```

Ajouter votre token GitHub :

```env
GITHUB_TOKEN=ghp_votre_token_ici
```

### 4️⃣ Démarrage

**Option A : Script automatique**

```bash
./start.sh
```

**Option B : Manuel**

```bash
npm start
```

### 5️⃣ Utilisation

Ouvrir dans le navigateur : <http://localhost:3000>

---

## 📝 Créer votre premier post

1. Remplir le formulaire
2. Cliquer sur "Créer et Publier"
3. ✅ Le post est automatiquement commité sur GitHub !

---

## 🎯 Fonctionnalités

- ✅ Création de posts avec formulaire
- ✅ Prévisualisation Markdown
- ✅ Commit automatique sur GitHub
- ✅ Statistiques en temps réel
- ✅ Liste des posts récents

---

## 🆘 Aide

**Problème de token ?**

1. Aller sur <https://github.com/settings/tokens>
2. "Generate new token (classic)"
3. Cocher permission `repo`
4. Copier le token dans `.env`

**Le serveur ne démarre pas ?**

```bash
# Vérifier Node.js
node --version  # Doit afficher v16+

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

---

## 📖 Documentation complète

Voir [README.md](README.md) pour la documentation complète.

---

**🏛️ Leidimen - Association de Solidarité**
