# 🚨 ERREUR: Unable to access identity settings

## ❌ Problème

```
Unable to access identity settings. When using git-gateway backend
make sure to enable Identity service and Git Gateway.
```

## ✅ Solution Rapide

Vous devez activer Netlify Identity sur votre site Netlify. Voici les étapes **EXACTES** :

---

### **ÉTAPE 1: Aller sur Netlify**

1. Ouvrez votre navigateur
2. Allez sur: **https://app.netlify.com**
3. Connectez-vous avec votre compte

### **ÉTAPE 2: Sélectionner votre site**

1. Dans la liste des sites, cliquez sur **leidimen** (ou votre nom de site)

### **ÉTAPE 3: Activer Identity**

1. Dans le menu de gauche, cliquez sur **"Site configuration"**
2. Puis cliquez sur **"Identity"**
3. Vous verrez un bouton **"Enable Identity"**
4. **Cliquez dessus** ✅

### **ÉTAPE 4: Activer Git Gateway**

1. Une fois Identity activé, descendez dans la même page
2. Trouvez la section **"Services"**
3. Cliquez sur **"Enable Git Gateway"** ✅

### **ÉTAPE 5: Configurer la sécurité**

1. Dans **"Registration"**, sélectionnez **"Invite only"** (recommandé)
2. Cela empêche n'importe qui de créer un compte

### **ÉTAPE 6: Inviter des utilisateurs**

1. Retournez à l'onglet **"Identity"** (en haut)
2. Cliquez sur **"Invite users"**
3. Entrez votre email (et celui des autres admins)
4. Cliquez sur **"Send invitation"**
5. Vous recevrez un email pour créer votre mot de passe

---

## 🔄 Après Configuration

1. **Ouvrez l'email d'invitation** reçu dans votre boîte mail
2. **Cliquez sur le lien** pour créer votre mot de passe
3. **Créez un mot de passe fort** (12+ caractères)
4. **Retournez sur** `https://votre-site.netlify.app/admin/`
5. **Connectez-vous** avec votre email et mot de passe

---

## ⚠️ Important

- ✅ Le code est **déjà prêt** (fait dans les commits précédents)
- ✅ Il faut juste **activer sur Netlify.com**
- ✅ C'est **100% GRATUIT** (jusqu'à 1000 utilisateurs/mois)
- ✅ Prend **2-3 minutes** à configurer

---

## 📸 Résumé Visuel

```
Netlify Dashboard
    ↓
Sélectionner "leidimen"
    ↓
Site configuration → Identity
    ↓
"Enable Identity" (cliquer)
    ↓
Services → "Enable Git Gateway" (cliquer)
    ↓
Registration → "Invite only" (sélectionner)
    ↓
Identity → "Invite users" (ajouter emails)
    ↓
✅ Terminé !
```

---

## 🆘 Besoin d'aide?

- Guide complet: `NETLIFY_IDENTITY_SETUP.md`
- Support Netlify: https://answers.netlify.com/
- Documentation: https://docs.netlify.com/visitor-access/identity/

---

## 🎯 Checklist

- [ ] Aller sur https://app.netlify.com
- [ ] Sélectionner le site "leidimen"
- [ ] Activer "Identity"
- [ ] Activer "Git Gateway"
- [ ] Configurer "Invite only"
- [ ] Inviter votre email
- [ ] Recevoir l'email d'invitation
- [ ] Créer votre mot de passe
- [ ] Tester la connexion sur /admin/

---

**Une fois ces étapes faites, l'erreur disparaîtra et vous pourrez accéder à l'admin CMS avec votre mot de passe ! 🎉**
