#!/usr/bin/env python3
"""
Script de migration simplifié utilisant le flux RSS WordPress
"""

import requests
import feedparser
import re
from pathlib import Path
from datetime import datetime
from bs4 import BeautifulSoup
import time

CONTENT_DIR = Path("content/posts")

def clean_html_to_markdown(html_content):
    """Convertit HTML en Markdown basique"""
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
    # Supprime accents
    replacements = {
        'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u', 'ç': 'c', 'œ': 'oe'
    }
    for old, new in replacements.items():
        slug = slug.replace(old, new)
    
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    return slug.strip('-')

def guess_villages(text):
    """Devine les villages"""
    villages = ["dorool", "diona", "debere", "diambana", "darawal", "tanal", "manko", "tacouti", "n'dumpa", "douentza"]
    found = []
    text_lower = text.lower()
    for v in villages:
        if v in text_lower:
            found.append(v)
    return found if found else ["douentza"]

def guess_category(title, content, tags):
    """Devine la catégorie"""
    text = (title + " " + content).lower()
    
    if any(word in text for word in ['école', 'ecole', 'éducation', 'education', 'élève', 'classe']):
        return "Éducation"
    elif any(word in text for word in ['santé', 'sante', 'puits', 'eau']):
        return "Santé"
    elif any(word in text for word in ['construction', 'infrastructure', 'bâtiment']):
        return "Infrastructure"
    elif any(word in text for word in ['maraîchage', 'agriculture', 'jardin']):
        return "Agriculture"
    
    return "Culture"

def fetch_rss_feed():
    """Récupère le flux RSS"""
    print("📡 Récupération du flux RSS WordPress...")
    
    feeds_to_try = [
        "https://leidimen.com/feed/",
        "https://leidimen.com/?feed=rss2",
        "https://leidimen.com/wp-rss2.php"
    ]
    
    for feed_url in feeds_to_try:
        try:
            print(f"  Essai: {feed_url}")
            feed = feedparser.parse(feed_url)
            if feed.entries:
                print(f"  ✅ Trouvé {len(feed.entries)} entrées")
                return feed.entries
        except Exception as e:
            print(f"  ❌ Erreur: {e}")
    
    return []

def scrape_individual_post(url):
    """Scrape un post individuel"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, timeout=30, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Cherche le contenu
        content = soup.find('div', class_='storycontent')
        
        if content:
            return str(content)
        
        # Fallback
        for tag in soup.find_all(['p', 'div']):
            if len(tag.get_text()) > 100:
                parents = [str(p.get('class')) for p in tag.parents if p.get('class')]
                if not any(x in str(parents) for x in ['sidebar', 'footer', 'nav', 'comment']):
                    return tag.get_text()[:500]
        
        return ""
    except Exception as e:
        print(f"    ⚠️  Erreur: {e}")
        return ""

def create_post_from_entry(entry):
    """Crée un post depuis une entrée RSS"""
    title = entry.get('title', 'Sans titre')
    link = entry.get('link', '')
    
    # Date
    published = entry.get('published_parsed') or entry.get('updated_parsed')
    if published:
        date = f"{published.tm_year}-{published.tm_mon:02d}-{published.tm_mday:02d}"
    else:
        date = "2010-01-01"
    
    # Contenu
    content = entry.get('summary', '') or entry.get('content', [{}])[0].get('value', '')
    
    # Tags
    tags = [tag.term for tag in entry.get('tags', [])] if entry.get('tags') else []
    
    # Si contenu vide, scrape la page
    if len(content) < 100:
        print(f"    📄 Contenu court, scraping de la page...")
        content = scrape_individual_post(link)
    
    if not content or len(content) < 50:
        return None
    
    # Nettoie
    clean_content = clean_html_to_markdown(content)
    
    if len(clean_content) < 50:
        return None
    
    # Métadonnées
    villages = guess_villages(title + " " + clean_content)
    category = guess_category(title, clean_content, tags)
    slug = create_slug(title)
    year = date.split('-')[0]
    
    # Frontmatter
    frontmatter = f"""---
title: "{title.replace('"', '\\"')}"
date: {date}
villages: {villages}
categories: ["{category}"]
tags: ["archive", "wordpress"{', "' + '", "'.join(tags[:3]) + '"' if tags else ''}]
description: "{title[:150].replace('"', '\\"')}"
draft: false
source: "{link}"
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
        filepath = year_dir / f"{slug}-{counter}.md"
        counter += 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    return filepath

def main():
    print("="*70)
    print("🔄 MIGRATION POSTS WORDPRESS → HUGO (via RSS)")
    print("="*70)
    
    # Essaie RSS
    entries = fetch_rss_feed()
    
    if not entries:
        print("\n❌ Impossible de récupérer le flux RSS")
        print("\n💡 Solution alternative:")
        print("  1. Exporter depuis WordPress Admin > Outils > Exporter")
        print("  2. Télécharger le fichier XML")
        print("  3. Utiliser hugo import jekyll ou wordpress-to-hugo")
        return
    
    print(f"\n📊 {len(entries)} posts trouvés dans le flux RSS")
    print("\n🔄 Traitement des posts...\n")
    
    created = 0
    skipped = 0
    
    for i, entry in enumerate(entries, 1):
        title = entry.get('title', 'Sans titre')
        print(f"[{i}/{len(entries)}] {title}")
        
        filepath = create_post_from_entry(entry)
        
        if filepath:
            print(f"  ✅ Créé: {filepath}")
            created += 1
        else:
            print(f"  ⚠️  Ignoré (contenu insuffisant)")
            skipped += 1
        
        time.sleep(0.3)
    
    print("\n" + "="*70)
    print("📊 RÉSUMÉ")
    print("="*70)
    print(f"Posts créés: {created}")
    print(f"Posts ignorés: {skipped}")
    print("="*70)

if __name__ == "__main__":
    main()
