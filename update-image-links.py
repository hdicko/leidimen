#!/usr/bin/env python3
"""
Met à jour uniquement les liens vers les images (sans retélécharger)
"""

import re
from pathlib import Path

POSTS_DIR = Path("content/posts")
GALLERIES_DIR = Path("content/galleries")

def update_file(filepath):
    """Met à jour les liens WordPress vers les liens locaux"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Remplace tous les liens WordPress par des liens locaux
        pattern = r'https?://(?:www\.)?leidimen\.com/wp-content/uploads/(\d{4})/(\d{2})/([^\s\)"\]]+\.(?:jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF))'
        
        def replace_url(match):
            year, month, filename = match.groups()
            return f"/images/wordpress/{year}-{month}-{filename}"
        
        content = re.sub(pattern, replace_url, content)
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    except Exception as e:
        print(f"  ⚠️  Erreur: {e}")
        return False

def main():
    print("✏️  Mise à jour des liens d'images...\n")
    
    updated = 0
    
    # Posts
    for md_file in POSTS_DIR.rglob("*.md"):
        if md_file.name != "_index.md" and update_file(md_file):
            print(f"  ✅ {md_file}")
            updated += 1
    
    # Galeries
    if GALLERIES_DIR.exists():
        for md_file in GALLERIES_DIR.rglob("*.md"):
            if update_file(md_file):
                print(f"  ✅ {md_file}")
                updated += 1
    
    print(f"\n✅ {updated} fichiers mis à jour")
    print("\n💡 Testez avec: npm run build")

if __name__ == "__main__":
    main()
