#!/usr/bin/env python3
"""
Télécharge toutes les images WordPress référencées dans les posts et galeries
et met à jour les liens pour pointer vers les images locales
"""

import requests
import re
from pathlib import Path
from urllib.parse import urlparse
import time
import hashlib

# Configuration
STATIC_IMAGES_DIR = Path("static/images/wordpress")
POSTS_DIR = Path("content/posts")
GALLERIES_DIR = Path("content/galleries")

def download_image(url, destination):
    """Télécharge une image"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, timeout=30, headers=headers, stream=True)
        response.raise_for_status()
        
        with open(destination, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"    ⚠️  Erreur: {e}")
        return False

def get_image_filename(url):
    """Génère un nom de fichier à partir de l'URL"""
    parsed = urlparse(url)
    path_parts = parsed.path.split('/')
    
    # Récupère année/mois si disponible (wp-content/uploads/YYYY/MM/filename.jpg)
    filename = path_parts[-1]
    
    if len(path_parts) >= 3:
        year = path_parts[-3] if path_parts[-3].isdigit() else None
        month = path_parts[-2] if path_parts[-2].isdigit() else None
        
        if year and month:
            return f"{year}-{month}-{filename}"
    
    return filename

def find_wordpress_images_in_file(filepath):
    """Trouve toutes les URLs d'images WordPress dans un fichier"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Cherche toutes les URLs vers wp-content/uploads
        pattern = r'(https?://(?:www\.)?leidimen\.com/wp-content/uploads/[^\s\)"\]]+\.(?:jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))'
        images = re.findall(pattern, content)
        
        return list(set(images)), content
    except Exception as e:
        print(f"  ⚠️  Erreur lecture {filepath}: {e}")
        return [], None

def update_image_urls_in_file(filepath, url_mapping):
    """Met à jour les URLs d'images dans un fichier"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        updated = False
        for old_url, new_path in url_mapping.items():
            if old_url in content:
                content = content.replace(old_url, new_path)
                updated = True
        
        if updated:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"  ⚠️  Erreur mise à jour {filepath}: {e}")
        return False

def process_posts():
    """Traite tous les posts"""
    print("\n📄 Traitement des posts...")
    
    all_images = {}
    files_to_update = {}
    
    for md_file in POSTS_DIR.rglob("*.md"):
        if md_file.name == "_index.md":
            continue
        
        images, content = find_wordpress_images_in_file(md_file)
        
        if images:
            print(f"  📝 {md_file.relative_to(POSTS_DIR)}: {len(images)} images")
            all_images[md_file] = images
    
    return all_images

def process_galleries():
    """Traite toutes les galeries"""
    print("\n📸 Traitement des galeries...")
    
    all_images = {}
    
    if not GALLERIES_DIR.exists():
        return all_images
    
    for md_file in GALLERIES_DIR.rglob("*.md"):
        images, content = find_wordpress_images_in_file(md_file)
        
        if images:
            print(f"  📷 {md_file.relative_to(GALLERIES_DIR)}: {len(images)} images")
            all_images[md_file] = images
    
    return all_images

def download_all_images(all_files_images):
    """Télécharge toutes les images et retourne le mapping URL -> chemin local"""
    print("\n📥 Téléchargement des images...")
    
    # Crée le dossier
    STATIC_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    
    # Collecte toutes les URLs uniques
    all_urls = set()
    for images in all_files_images.values():
        all_urls.update(images)
    
    print(f"  Total d'images uniques à télécharger: {len(all_urls)}")
    
    url_mapping = {}
    downloaded = 0
    skipped = 0
    failed = 0
    
    for i, url in enumerate(sorted(all_urls), 1):
        filename = get_image_filename(url)
        destination = STATIC_IMAGES_DIR / filename
        
        # Chemin relatif pour Hugo (depuis static/)
        hugo_path = f"/images/wordpress/{filename}"
        
        # Skip si existe déjà
        if destination.exists():
            print(f"  [{i}/{len(all_urls)}] ⏭️  {filename} (existe)")
            url_mapping[url] = hugo_path
            skipped += 1
            continue
        
        print(f"  [{i}/{len(all_urls)}] 📥 {filename}")
        
        if download_image(url, destination):
            url_mapping[url] = hugo_path
            downloaded += 1
        else:
            failed += 1
        
        # Pause pour ne pas surcharger le serveur
        if i % 10 == 0:
            time.sleep(0.5)
    
    print(f"\n  ✅ Téléchargées: {downloaded}")
    print(f"  ⏭️  Déjà présentes: {skipped}")
    print(f"  ❌ Échecs: {failed}")
    
    return url_mapping

def update_all_files(all_files_images, url_mapping):
    """Met à jour tous les fichiers avec les nouveaux chemins"""
    print("\n✏️  Mise à jour des fichiers...")
    
    updated = 0
    
    for filepath, images in all_files_images.items():
        # Crée le mapping pour ce fichier
        file_mapping = {url: url_mapping[url] for url in images if url in url_mapping}
        
        if file_mapping and update_image_urls_in_file(filepath, file_mapping):
            try:
                rel_path = filepath.relative_to(Path.cwd())
            except ValueError:
                rel_path = filepath
            print(f"  ✅ {rel_path}")
            updated += 1
    
    print(f"\n  Total fichiers mis à jour: {updated}")

def main():
    print("="*70)
    print("🖼️  TÉLÉCHARGEMENT DES IMAGES WORDPRESS")
    print("="*70)
    
    # Collecte toutes les images
    posts_images = process_posts()
    galleries_images = process_galleries()
    
    all_files_images = {**posts_images, **galleries_images}
    
    if not all_files_images:
        print("\n❌ Aucune image WordPress trouvée")
        return
    
    print(f"\n📊 {len(all_files_images)} fichiers contiennent des images")
    
    # Télécharge les images
    url_mapping = download_all_images(all_files_images)
    
    if not url_mapping:
        print("\n❌ Aucune image téléchargée")
        return
    
    # Met à jour les fichiers
    update_all_files(all_files_images, url_mapping)
    
    print("\n" + "="*70)
    print("✅ TÉLÉCHARGEMENT TERMINÉ")
    print("="*70)
    print(f"\n📁 Images stockées dans: {STATIC_IMAGES_DIR}")
    print(f"🔗 Les liens ont été mis à jour vers: /images/wordpress/")
    print("\n💡 Prochaines étapes:")
    print("  1. Vérifier les images dans static/images/wordpress/")
    print("  2. Lancer: npm run build")
    print("  3. Tester le site localement")
    print("  4. Commiter: git add static/images/ content/")

if __name__ == "__main__":
    main()
