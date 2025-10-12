# Guide de sécurisation de l'admin Netlify CMS avec Netlify Identity

## 🔐 Vue d'ensemble

Ce guide explique comment protéger l'accès à l'interface d'administration Netlify CMS (`/admin/`) avec un système d'authentification sécurisé.

## ✅ Prérequis

- Un site déployé sur Netlify
- Un compte Netlify avec accès au dashboard
- Le site doit utiliser Git Gateway comme backend (déjà configuré)

## 📋 Étapes de configuration sur Netlify

### 1. Activer Netlify Identity

1. Connectez-vous à votre dashboard Netlify : https://app.netlify.com
2. Sélectionnez votre site **leidimen**
3. Allez dans **Site configuration** → **Identity**
4. Cliquez sur **Enable Identity**

### 2. Configurer Git Gateway

1. Dans la même section **Identity**, descendez jusqu'à **Services**
2. Cliquez sur **Enable Git Gateway**
3. Cela permettra à Netlify CMS de gérer les commits via l'authentification

### 3. Configurer les paramètres d'inscription

Dans **Identity** → **Registration preferences**, choisissez :

- **Invite only** (Recommandé) : Seuls les utilisateurs invités peuvent s'inscrire
- **Open** : N'importe qui peut s'inscrire (non recommandé pour un site privé)

### 4. Inviter des utilisateurs

1. Dans l'onglet **Identity**, cliquez sur **Invite users**
2. Entrez l'adresse email de la personne à autoriser
3. Elle recevra un email avec un lien pour créer son mot de passe
4. Répétez pour chaque administrateur

### 5. Configurer la confirmation d'email (optionnel)

Dans **Identity** → **Emails**, vous pouvez personnaliser :
- Email de confirmation
- Email de récupération de mot de passe
- Email d'invitation

## 🔧 Modifications du code (déjà effectuées)

Les fichiers suivants ont été mis à jour pour supporter Netlify Identity :

### 1. `/static/admin/index.html`
```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```
✅ Déjà présent

### 2. `/layouts/partials/head.html`
```html
<!-- Netlify Identity Widget -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```
✅ Ajouté

### 3. `/layouts/_default/baseof.html`
```html
<!-- Netlify Identity Widget -->
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```
✅ Ajouté

## 🚀 Utilisation

### Pour un administrateur :

1. Aller sur `https://votre-site.netlify.app/admin/`
2. Cliquer sur "Login with Netlify Identity"
3. Entrer email et mot de passe
4. Accéder au CMS

### Pour un nouvel utilisateur invité :

1. Recevoir l'email d'invitation
2. Cliquer sur le lien
3. Créer un mot de passe sécurisé
4. Confirmer l'inscription
5. Se connecter à `/admin/`

## 🔒 Sécurité

### Niveau de sécurité

- ✅ Authentification par email/mot de passe
- ✅ Tokens JWT sécurisés
- ✅ Gestion des rôles (Admin)
- ✅ Récupération de mot de passe
- ✅ Invitation uniquement (si configuré)

### Bonnes pratiques

1. **Utilisez "Invite only"** : N'autorisez que les personnes de confiance
2. **Mots de passe forts** : Exigez des mots de passe de 12+ caractères
3. **Auditez régulièrement** : Vérifiez la liste des utilisateurs autorisés
4. **Révoquez l'accès** : Supprimez les utilisateurs qui n'ont plus besoin d'accès

## 🆓 Coût

Netlify Identity est **GRATUIT** jusqu'à :
- 1 000 utilisateurs actifs/mois
- 5 000 utilisateurs en base de données

Pour un site d'association comme le vôtre, c'est largement suffisant.

## 🔄 Alternative : Protection par mot de passe basique

Si vous préférez une solution plus simple (moins sécurisée), vous pouvez utiliser :

### Option A : Basic Auth sur Netlify (Payant - Pro plan requis)

Dans `netlify.toml` :
```toml
[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
  force = true
  headers = {X-From = "Netlify"}
  
[context.production]
  [context.production.basic_auth]
    username = "admin"
    password = "votre-mot-de-passe"
```

⚠️ Nécessite un plan Netlify Pro ($19/mois)

### Option B : Protection via _headers (Basique)

Créer `/static/_headers` :
```
/admin/*
  Basic-Auth: admin:votre-mot-de-passe-encodé
```

⚠️ Moins sécurisé, le mot de passe est visible dans le code

## 📚 Ressources

- [Documentation Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [Documentation Git Gateway](https://docs.netlify.com/visitor-access/git-gateway/)
- [Netlify CMS Authentication](https://decapcms.org/docs/authentication-backends/)

## ✅ Checklist de déploiement

- [ ] Activer Netlify Identity sur le site
- [ ] Activer Git Gateway
- [ ] Configurer "Invite only"
- [ ] Inviter les administrateurs
- [ ] Tester la connexion à `/admin/`
- [ ] Commit et push du code mis à jour
- [ ] Vérifier que l'authentification fonctionne en production

## 🐛 Dépannage

### Problème : "Cannot read property 'on' of undefined"
**Solution** : Vérifiez que le script Netlify Identity est bien chargé dans `head.html`

### Problème : Impossible de se connecter
**Solution** : Vérifiez que Git Gateway est activé dans Netlify

### Problème : Email d'invitation non reçu
**Solution** : Vérifiez les spams, ou renvoyez l'invitation depuis le dashboard

## 📞 Support

Pour toute question sur Netlify Identity :
- [Netlify Support](https://www.netlify.com/support/)
- [Netlify Community Forums](https://answers.netlify.com/)
