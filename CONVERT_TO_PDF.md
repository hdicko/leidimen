# Instructions pour générer un PDF

## Option 1 : Utiliser Pandoc (Recommandé)

Pandoc est un convertisseur de documents universel très puissant.

### Installation

```bash
# Ubuntu/Debian
sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended

# macOS
brew install pandoc basictex

# Windows
# Télécharger depuis https://pandoc.org/installing.html
```

### Conversion en PDF

```bash
cd /home/dicko/dev/hugo/hugo_sites/leidimen

# Conversion simple
pandoc GUIDE_CREATION_ARTICLE.md -o GUIDE_CREATION_ARTICLE.pdf

# Conversion avec options avancées (recommandé)
pandoc GUIDE_CREATION_ARTICLE.md \
  -o GUIDE_CREATION_ARTICLE.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=2 \
  -V geometry:margin=2.5cm \
  -V fontsize=11pt \
  -V documentclass=article \
  -V lang=fr \
  --highlight-style=tango
```

### Options expliquées

- `--pdf-engine=xelatex` : Meilleur support Unicode et polices
- `--toc` : Ajoute une table des matières
- `--toc-depth=2` : Table des matières jusqu'au niveau 2
- `-V geometry:margin=2.5cm` : Marges de 2.5cm
- `-V fontsize=11pt` : Taille de police 11pt
- `-V lang=fr` : Document en français
- `--highlight-style=tango` : Style de coloration syntaxique

---

## Option 2 : VS Code avec Extension

### Installation de l'extension

1. Ouvrir VS Code
2. Extensions (Ctrl+Shift+X)
3. Rechercher "Markdown PDF"
4. Installer l'extension "Markdown PDF" par yzane

### Utilisation

1. Ouvrir `GUIDE_CREATION_ARTICLE.md`
2. Clic droit dans l'éditeur
3. Sélectionner "Markdown PDF: Export (pdf)"
4. Le PDF sera créé dans le même dossier

---

## Option 3 : En ligne (Sans installation)

### Utiliser un service en ligne

1. **Dillinger** : https://dillinger.io/
   - Ouvrir le site
   - Copier-coller le contenu du fichier
   - Export → PDF

2. **Markdown to PDF** : https://www.markdowntopdf.com/
   - Uploader le fichier
   - Télécharger le PDF

3. **CloudConvert** : https://cloudconvert.com/md-to-pdf
   - Uploader le fichier GUIDE_CREATION_ARTICLE.md
   - Convertir
   - Télécharger

---

## Option 4 : Utiliser Chrome/Chromium

### Méthode simple

1. Installer une extension de preview Markdown pour Chrome
   - "Markdown Preview Plus" ou "Markdown Viewer"

2. Ouvrir le fichier .md dans Chrome

3. Imprimer (Ctrl+P)

4. Destination : "Enregistrer au format PDF"

5. Options :
   - Mise en page : Portrait
   - Marges : Normales
   - Inclure les arrière-plans

---

## Commande rapide (Pandoc)

```bash
pandoc GUIDE_CREATION_ARTICLE.md -o GUIDE_CREATION_ARTICLE.pdf --pdf-engine=xelatex --toc -V geometry:margin=2.5cm -V lang=fr
```

---

## Résultat

Le PDF contiendra :

- ✅ Table des matières automatique
- ✅ Tous les titres et sous-titres
- ✅ Mise en forme complète
- ✅ Exemples de code formatés
- ✅ Listes et tableaux
- ✅ ~70 pages de documentation complète

---

**Fichier source :** GUIDE_CREATION_ARTICLE.md  
**Emplacement :** /home/dicko/dev/hugo/hugo_sites/leidimen/
