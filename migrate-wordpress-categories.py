#!/usr/bin/env python3
"""
Script de migration des posts WordPress par catégories
Récupère tous les posts des catégories: Divers, News, Réunions, Sorties
"""

import requests
from bs4 import BeautifulSoup
import re
from pathlib import Path
import time
from urllib.parse import urljoin

CONTENT_DIR = Path("content/posts")
BASE_URL = "https://leidimen.com"

# Mapping des catégories WordPress vers Hugo
CATEGORIES = {
    'non-classe': {'name': 'Divers', 'hugo_cat': 'Culture'},
    'news': {'name': 'News Leidimen', 'hugo_cat': 'Éducation'},
    'reunions': {'name': 'Réunions', 'hugo_cat': 'Culture'},
    'infos-sorties': {'name': 'Sorties', 'hugo_cat': 'Culture'}
}

def clean_html_to_markdown(html_content):
    """Convertit HTML en Markdown"""
    if not html_content:
        return ""
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remplace les images
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', 'Image')
        if src:
            img.replace_with(f'\n![{alt}]({src})\n')
    
    # Remplace les liens
    for a in soup.find_all('a'):
        href = a.get('href', '')
        text = a.get_text() or href
        if href and not href.startswith('#'):
            a.replace_with(f'[{text}]({href})')
    
    # Remplace les titres
    for i in range(1, 7):
        for h in soup.find_all(f'h{i}'):
            text = h.get_text()
            h.replace_with(f'\n{"#" * (i+1)} {text}\n\n')
    
    # Remplace les listes
    for ul in soup.find_all('ul'):
        items = []
        for li in ul.find_all('li'):
            items.append(f'- {li.get_text()}')
        ul.replace_with('\n' + '\n'.join(items) + '\n')
    
    # Récupère le texte
    text = soup.get_text()
    
    # Nettoie
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    
    return text.strip()

def create_slug(title):
    """Crée un slug"""
    slug = title.lower()
    replacements = {
        'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'œ': 'oe'
    }
    for old, new in replacements.items():
        slug = slug.replace(old, new)
    
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    return slug.strip('-')[:80]  # Limite la longueur

def guess_villages(text):
    """Devine les villages"""
    villages = ["dorool", "diona", "debere", "diambana", "darawal", "tanal", "manko", "tacouti", "n'dumpa", "douentza"]
    found = []
    text_lower = text.lower()
    for v in villages:
        if v in text_lower:
            found.append(v)
    return found if found else ["douentza"]

def scrape_post_content(url):
    """Récupère le contenu d'un post"""
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Cherche le contenu principal
        content = soup.find('div', class_='storycontent')
        
        if content:
            return str(content)
        
        # Fallback: cherche les paragraphes
        paragraphs = []
        for p in soup.find_all('p'):
            text = p.get_text().strip()
            if len(text) > 30:
                # Évite les éléments de navigation
                parent_classes = ' '.join([str(c) for parent in p.parents for c in parent.get('class', [])])
                if not any(x in parent_classes for x in ['sidebar', 'footer', 'nav', 'comment', 'meta']):
                    paragraphs.append(text)
        
        if paragraphs:
            return '\n\n'.join(paragraphs[:15])  # Limite à 15 paragraphes
        
        return ""
    except Exception as e:
        print(f"    ⚠️  Erreur: {e}")
        return ""

def scrape_category_page(category_slug, page=1):
    """Scrape une page de catégorie"""
    if page == 1:
        url = f"{BASE_URL}/category/{category_slug}/"
    else:
        url = f"{BASE_URL}/category/{category_slug}/page/{page}/"
    
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        posts = []
        
        # Cherche les articles
        for heading in soup.find_all(['h2', 'h3']):
            link = heading.find('a')
            if not link:
                continue
            
            title = link.get_text().strip()
            post_url = urljoin(BASE_URL, link.get('href', ''))
            
            # Skip si pas un vrai post
            if 'leidimen.com' not in post_url or '#' in post_url:
                continue
            
            # Cherche la date dans le parent
            date_elem = heading.find_parent(['div', 'article'])
            date_text = date_elem.get_text() if date_elem else ''
            
            # Extrait la date
            date_match = re.search(r'(\d{1,2})\s+(\w+)\s+(\d{4})', date_text)
            if date_match:
                day, month_name, year = date_match.groups()
                months = {
                    'january': '01', 'february': '02', 'march': '03', 'april': '04',
                    'may': '05', 'june': '06', 'july': '07', 'august': '08',
                    'september': '09', 'october': '10', 'november': '11', 'december': '12',
                    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
                    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
                    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
                }
                month = months.get(month_name.lower(), '01')
                date = f"{year}-{month}-{day.zfill(2)}"
            else:
                date = "2010-01-01"
            
            posts.append({
                'title': title,
                'url': post_url,
                'date': date,
                'category_slug': category_slug
            })
        
        # Cherche le lien "page suivante"
        next_link = soup.find('a', text=re.compile(r'next|suivant|»|›', re.I))
        has_next = next_link is not None
        
        return posts, has_next
        
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            return [], False
        raise
    except Exception as e:
        print(f"  ⚠️  Erreur sur {url}: {e}")
        return [], False

def create_markdown_post(post_data, content, hugo_category):
    """Crée un fichier Markdown"""
    if not content or len(content) < 50:
        return None
    
    year = post_data['date'].split('-')[0]
    slug = create_slug(post_data['title'])
    
    clean_content = clean_html_to_markdown(content)
    
    if len(clean_content) < 50:
        return None
    
    villages = guess_villages(post_data['title'] + " " + clean_content)
    
    # Frontmatter
    frontmatter = f"""---
title: "{post_data['title'].replace('"', '\\"')}"
date: {post_data['date']}
villages: {villages}
categories: ["{hugo_category}"]
tags: ["archive", "wordpress", "{post_data['category_slug']}"]
description: "{post_data['title'][:150].replace('"', '\\"')}"
draft: false
source: "{post_data['url']}"
---

"""
    
    full_content = frontmatter + clean_content
    
    # Crée le fichier
    year_dir = CONTENT_DIR / year
    year_dir.mkdir(exist_ok=True)
    
    filepath = year_dir / f"{slug}.md"
    
    # Évite doublons
    counter = 1
    while filepath.exists():
        # Vérifie si c'est vraiment un doublon
        with open(filepath, 'r', encoding='utf-8') as f:
            existing = f.read()
            if post_data['url'] in existing:
                return None  # Même post déjà importé
        filepath = year_dir / f"{slug}-{counter}.md"
        counter += 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    return filepath

def scrape_category(category_slug, category_info):
    """Scrape tous les posts d'une catégorie"""
    print(f"\n📂 Catégorie: {category_info['name']}")
    print(f"   URL: {BASE_URL}/category/{category_slug}/")
    
    all_posts = []
    page = 1
    
    while True:
        print(f"   📄 Page {page}...", end=' ')
        posts, has_next = scrape_category_page(category_slug, page)
        
        if not posts:
            print("(vide)")
            break
        
        print(f"{len(posts)} posts")
        all_posts.extend(posts)
        
        if not has_next:
            break
        
        page += 1
        time.sleep(0.5)
    
    print(f"   ✅ Total: {len(all_posts)} posts trouvés")
    
    return all_posts

def main():
    print("="*70)
    print("🔄 MIGRATION POSTS WORDPRESS PAR CATÉGORIES")
    print("="*70)
    print("Catégories à importer:")
    for slug, info in CATEGORIES.items():
        print(f"  - {info['name']} → {info['hugo_cat']}")
    print("="*70)
    
    all_posts = []
    
    # Scrape chaque catégorie
    for category_slug, category_info in CATEGORIES.items():
        posts = scrape_category(category_slug, category_info)
        for post in posts:
            post['hugo_category'] = category_info['hugo_cat']
        all_posts.extend(posts)
        time.sleep(1)
    
    print(f"\n📊 Total de posts trouvés: {len(all_posts)}")
    
    # Crée les posts
    created = 0
    skipped = 0
    duplicates = 0
    
    print("\n🔄 Traitement des posts...\n")
    
    for i, post in enumerate(all_posts, 1):
        print(f"[{i}/{len(all_posts)}] {post['title'][:60]}")
        print(f"  📅 {post['date']} | 📂 {post['hugo_category']}")
        
        # Récupère le contenu
        content = scrape_post_content(post['url'])
        
        if content:
            filepath = create_markdown_post(post, content, post['hugo_category'])
            if filepath:
                print(f"  ✅ Créé: {filepath}")
                created += 1
            elif filepath is None and 'source:' in content:
                print(f"  ⏭️  Doublon détecté")
                duplicates += 1
            else:
                print(f"  ⚠️  Ignoré (contenu insuffisant)")
                skipped += 1
        else:
            print(f"  ⚠️  Contenu vide")
            skipped += 1
        
        time.sleep(0.4)
    
    print("\n" + "="*70)
    print("📊 RÉSUMÉ")
    print("="*70)
    print(f"Posts trouvés: {len(all_posts)}")
    print(f"Posts créés: {created}")
    print(f"Doublons ignorés: {duplicates}")
    print(f"Posts ignorés: {skipped}")
    print("="*70)
    
    print("\n✅ Migration terminée!")
    print("\n💡 Prochaines étapes:")
    print("  1. Vérifier les posts dans content/posts/")
    print("  2. Lancer: npm run build")
    print("  3. Commiter les changements")

if __name__ == "__main__":
    main()
