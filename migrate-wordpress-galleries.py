#!/usr/bin/env python3
"""
Script de migration des galeries photos de leidimen.com vers Hugo
Crée des page bundles avec les images référencées
"""

import requests
from bs4 import BeautifulSoup
import re
from pathlib import Path
from datetime import datetime
import time

CONTENT_DIR = Path("content/galleries")

# Galeries à migrer
GALLERIES = [
    {
        'url': 'https://leidimen.com/photos/photos-de-la-soiree-leidimen',
        'title': 'Photos de la soirée Leïdimen',
        'slug': 'soiree-leidimen',
        'date': '2008-05-01',
        'description': 'Photos de la soirée organisée par Leïdimen en 2008'
    },
    {
        'url': 'https://leidimen.com/photos/photos-des-tournois-leidimen',
        'title': 'Photos des tournois Leïdimen',
        'slug': 'tournois-leidimen',
        'date': '2007-10-01',
        'description': 'Photos des tournois de poker organisés au profit de Leïdimen'
    },
    {
        'url': 'https://leidimen.com/photos/des-ecoliers-francais-a-la-decouverte-du-mali',
        'title': 'Des écoliers français à la découverte du Mali',
        'slug': 'ecoliers-francais-mali',
        'date': '2008-12-01',
        'description': 'Photos des écoliers français découvrant le Mali et ses écoles'
    }
]

def extract_images_from_page(url):
    """Extrait toutes les URLs d'images d'une page"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        images = []
        
        # Cherche toutes les images dans le contenu
        content = soup.find('div', class_='storycontent') or soup.find('div', class_='entry-content') or soup
        
        for link in content.find_all('a'):
            href = link.get('href', '')
            # Cherche les liens vers wp-content/uploads
            if 'wp-content/uploads' in href and any(ext in href.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif']):
                images.append(href)
        
        # Cherche aussi les balises img directement
        for img in content.find_all('img'):
            src = img.get('src', '')
            if 'wp-content/uploads' in src:
                images.append(src)
        
        # Déduplique
        images = list(dict.fromkeys(images))
        
        print(f"  ✅ {len(images)} images trouvées")
        return images
        
    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return []

def guess_villages(title, description):
    """Devine les villages"""
    villages_list = ["dorool", "diona", "debere", "diambana", "darawal", "tanal", "manko", "tacouti", "n'dumpa", "douentza"]
    found = []
    text = (title + " " + description).lower()
    
    for village in villages_list:
        if village in text:
            found.append(village)
    
    return found if found else ["douentza"]

def create_gallery_bundle(gallery_data, images):
    """Crée un page bundle de galerie Hugo"""
    slug = gallery_data['slug']
    gallery_dir = CONTENT_DIR / slug
    gallery_dir.mkdir(parents=True, exist_ok=True)
    
    # Devine les villages
    villages = guess_villages(gallery_data['title'], gallery_data['description'])
    
    # Détermine la catégorie
    if 'école' in gallery_data['title'].lower() or 'écolier' in gallery_data['title'].lower():
        category = "Éducation"
    elif 'soirée' in gallery_data['title'].lower() or 'tournoi' in gallery_data['title'].lower():
        category = "Culture"
    else:
        category = "Culture"
    
    # Crée le frontmatter
    frontmatter = f"""---
title: "{gallery_data['title']}"
date: {gallery_data['date']}
type: "galleries"
villages: {villages}
categories: ["{category}"]
tags: ["photos", "archive", "galerie"]
description: "{gallery_data['description']}"
draft: false
source: "{gallery_data['url']}"
---

{gallery_data['description']}

## Galerie photos

{{{{< gallery >}}}}

<!-- Images originales (liens WordPress) -->
"""
    
    # Ajoute les liens vers les images
    for i, img_url in enumerate(images, 1):
        img_name = img_url.split('/')[-1]
        frontmatter += f"\n<!-- {i}. [{img_name}]({img_url}) -->"
    
    frontmatter += "\n\n> **Note**: Les images sont référencées depuis l'ancien site WordPress. Pour une meilleure intégration, téléchargez les images et placez-les dans ce dossier.\n"
    
    # Crée un fichier README pour faciliter le téléchargement des images
    download_script = "#!/bin/bash\n# Script pour télécharger les images\n\n"
    for i, img_url in enumerate(images, 1):
        img_name = f"photo-{i:03d}-{img_url.split('/')[-1]}"
        download_script += f'wget -O "{img_name}" "{img_url}"\n'
    
    # Sauvegarde le fichier principal
    index_file = gallery_dir / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
    
    # Sauvegarde le script de téléchargement
    download_file = gallery_dir / "download-images.sh"
    with open(download_file, 'w', encoding='utf-8') as f:
        f.write(download_script)
    download_file.chmod(0o755)
    
    print(f"  ✅ Créé: {index_file}")
    print(f"  📥 Script de téléchargement: {download_file}")
    
    return index_file

def main():
    print("="*70)
    print("📸 MIGRATION DES GALERIES PHOTOS WORDPRESS → HUGO")
    print("="*70)
    
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    
    created = 0
    
    for gallery in GALLERIES:
        print(f"\n📷 {gallery['title']}")
        print(f"  URL: {gallery['url']}")
        
        # Extrait les images
        images = extract_images_from_page(gallery['url'])
        
        if images:
            # Crée le bundle
            filepath = create_gallery_bundle(gallery, images)
            created += 1
            time.sleep(0.5)
        else:
            print(f"  ⚠️  Aucune image trouvée, galerie ignorée")
    
    print("\n" + "="*70)
    print("📊 RÉSUMÉ")
    print("="*70)
    print(f"Galeries créées: {created}")
    print("="*70)
    print("\n✅ Migration terminée!")
    print("\n💡 Prochaines étapes:")
    print("  1. Aller dans content/galleries/<nom-galerie>/")
    print("  2. Exécuter ./download-images.sh pour télécharger les images")
    print("  3. Les images seront dans le même dossier que index.md")
    print("  4. Le shortcode {{< gallery >}} les affichera automatiquement")
    print("  5. Lancer: npm run build")

if __name__ == "__main__":
    main()
