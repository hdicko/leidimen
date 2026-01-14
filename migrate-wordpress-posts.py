#!/usr/bin/env python3
"""
Script de migration des posts WordPress de leidimen.com vers Hugo
Récupère tous les posts des archives 2006-2017 et les convertit en Markdown
"""

import requests
from bs4 import BeautifulSoup
import re
import os
from pathlib import Path
from datetime import datetime
import time
import html
from urllib.parse import urljoin, urlparse

# Configuration
BASE_URL = "https://leidimen.com"
CONTENT_DIR = Path("content/posts")

# Liste des archives disponibles (basée sur le scraping)
ARCHIVES = [
    "2006/09", "2006/10", "2006/12",
    "2007/01", "2007/02", "2007/06", "2007/07", "2007/09", "2007/10", "2007/11", "2007/12",
    "2008/02", "2008/04", "2008/05", "2008/09", "2008/10",
    "2009/02",
    "2010/02",
    "2011/07",
    "2012/01",
    "2013/03",
    "2017/01"
]

def clean_html(html_content):
    """Nettoie le HTML et convertit en Markdown simple"""
    if not html_content:
        return ""
    
    # Parse HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remplace les liens d'images par shortcode Hugo
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '')
        if src:
            # Télécharge l'image ou garde le lien
            img.replace_with(f'\n{{{{< figure src="{src}" alt="{alt}" >}}}}\n')
    
    # Remplace les liens
    for a in soup.find_all('a'):
        href = a.get('href', '')
        text = a.get_text()
        a.replace_with(f'[{text}]({href})')
    
    # Récupère le texte
    text = soup.get_text()
    
    # Nettoie les espaces multiples
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    
    return text.strip()

def extract_category(category_link):
    """Extrait la catégorie et la mappe vers les catégories Hugo"""
    category_map = {
        'news': 'Éducation',
        'non-classe': 'Culture',
        'reunions': 'Culture',
        'infos-sorties': 'Culture'
    }
    
    if not category_link:
        return 'Culture'
    
    for key, value in category_map.items():
        if key in category_link.lower():
            return value
    
    return 'Culture'

def guess_villages(title, content):
    """Devine les villages mentionnés dans le contenu"""
    villages_list = ["dorool", "diona", "debere", "diambana", "darawal", "tanal", "manko", "tacouti", "n'dumpa", "douentza"]
    found_villages = []
    
    text = (title + " " + content).lower()
    
    for village in villages_list:
        if village in text:
            found_villages.append(village)
    
    # Si aucun village trouvé, retourne Douentza par défaut
    return found_villages if found_villages else ["douentza"]

def create_slug(title):
    """Crée un slug à partir du titre"""
    # Supprime les accents
    slug = title.lower()
    slug = re.sub(r'[àâä]', 'a', slug)
    slug = re.sub(r'[éèêë]', 'e', slug)
    slug = re.sub(r'[îï]', 'i', slug)
    slug = re.sub(r'[ôö]', 'o', slug)
    slug = re.sub(r'[ùûü]', 'u', slug)
    slug = re.sub(r'[ç]', 'c', slug)
    
    # Remplace les caractères spéciaux
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug)
    
    return slug.strip('-')

def fetch_post_content(post_url):
    """Récupère le contenu complet d'un post"""
    try:
        response = requests.get(post_url, timeout=30, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Cherche le contenu principal (différentes structures WordPress)
        content_div = soup.find('div', class_='storycontent') or \
                     soup.find('div', class_='entry-content') or \
                     soup.find('div', class_='post-content') or \
                     soup.find('div', class_='entry') or \
                     soup.find('article') or \
                     soup.find('div', class_='content')
        
        if content_div:
            return str(content_div)
        
        # Fallback: cherche tout le texte après le titre
        title = soup.find(['h1', 'h2'], class_=re.compile(r'title|entry-title'))
        if title:
            # Récupère tous les paragraphes après le titre
            content_parts = []
            for sibling in title.find_all_next(['p', 'div', 'img']):
                if sibling.get('class') and any(x in str(sibling.get('class')) for x in ['footer', 'comment', 'sidebar']):
                    break
                content_parts.append(str(sibling))
            
            if content_parts:
                return ''.join(content_parts[:20])  # Limite à 20 éléments
        
        return ""
    except Exception as e:
        print(f"  ⚠️  Erreur lors de la récupération de {post_url}: {e}")
        return ""

def scrape_archive_page(year_month):
    """Scrape une page d'archive spécifique"""
    url = f"{BASE_URL}/{year_month}/"
    print(f"\n📅 Scraping {year_month}...")
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        posts = []
        
        # Cherche tous les articles
        articles = soup.find_all(['article', 'div'], class_=re.compile(r'post|entry'))
        
        if not articles:
            # Fallback: cherche les h2/h3 avec des liens
            articles = soup.find_all(['h2', 'h3'])
        
        for article in articles:
            # Extrait le titre et le lien
            title_elem = article.find(['h2', 'h3', 'a'], class_=re.compile(r'title|entry-title'))
            if not title_elem:
                title_elem = article.find('a')
            
            if not title_elem:
                continue
            
            link = title_elem.find('a')
            if not link:
                link = title_elem if title_elem.name == 'a' else None
            
            if not link:
                continue
            
            title = link.get_text().strip()
            post_url = urljoin(BASE_URL, link.get('href', ''))
            
            # Skip si c'est un lien interne
            if 'leidimen.com' not in post_url or '#' in post_url:
                continue
            
            # Extrait la date
            date_match = re.search(r'(\d{1,2})\s+(\w+)\s+(\d{4})', article.get_text())
            if date_match:
                day, month_name, year = date_match.groups()
                # Convertit le nom du mois
                months = {
                    'january': '01', 'february': '02', 'march': '03', 'april': '04',
                    'may': '05', 'june': '06', 'july': '07', 'august': '08',
                    'september': '09', 'october': '10', 'november': '11', 'december': '12',
                    'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
                    'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
                    'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
                }
                month = months.get(month_name.lower(), year_month.split('/')[1])
                date = f"{year}-{month}-{day.zfill(2)}"
            else:
                # Utilise la date de l'archive
                year, month = year_month.split('/')
                date = f"{year}-{month}-01"
            
            # Extrait la catégorie
            category_elem = article.find('a', href=re.compile(r'/category/'))
            category = extract_category(category_elem.get('href') if category_elem else None)
            
            posts.append({
                'title': title,
                'url': post_url,
                'date': date,
                'category': category,
                'year_month': year_month
            })
        
        print(f"  ✅ Trouvé {len(posts)} posts")
        return posts
        
    except Exception as e:
        print(f"  ❌ Erreur: {e}")
        return []

def create_markdown_post(post_data, content):
    """Crée un fichier Markdown Hugo"""
    year = post_data['date'].split('-')[0]
    slug = create_slug(post_data['title'])
    
    # Nettoie le contenu
    clean_content = clean_html(content)
    
    # Devine les villages
    villages = guess_villages(post_data['title'], clean_content)
    
    # Crée le frontmatter
    frontmatter = f"""---
title: "{post_data['title'].replace('"', '\\"')}"
date: {post_data['date']}
villages: {villages}
categories: ["{post_data['category']}"]
tags: ["archive", "wordpress"]
description: "{post_data['title'][:150].replace('"', '\\"')}"
draft: false
source: "{post_data['url']}"
---

"""
    
    full_content = frontmatter + clean_content
    
    # Crée le dossier
    year_dir = CONTENT_DIR / year
    year_dir.mkdir(exist_ok=True)
    
    # Crée le fichier
    filename = f"{slug}.md"
    filepath = year_dir / filename
    
    # Évite d'écraser les fichiers existants
    if filepath.exists():
        print(f"  ⚠️  Le fichier existe déjà: {filepath}")
        return None
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"  ✅ Créé: {filepath}")
    return filepath

def main():
    print("="*60)
    print("🔄 MIGRATION DES POSTS WORDPRESS → HUGO")
    print("="*60)
    print(f"Source: {BASE_URL}")
    print(f"Destination: {CONTENT_DIR}")
    print("="*60)
    
    all_posts = []
    
    # Scrape chaque archive
    for archive in ARCHIVES:
        posts = scrape_archive_page(archive)
        all_posts.extend(posts)
        time.sleep(1)  # Pause entre les requêtes
    
    print(f"\n📊 Total de posts trouvés: {len(all_posts)}")
    
    # Récupère et crée les posts
    created_count = 0
    skipped_count = 0
    
    for i, post in enumerate(all_posts, 1):
        print(f"\n[{i}/{len(all_posts)}] {post['title']}")
        print(f"  URL: {post['url']}")
        
        # Récupère le contenu complet
        content = fetch_post_content(post['url'])
        
        if content:
            filepath = create_markdown_post(post, content)
            if filepath:
                created_count += 1
            else:
                skipped_count += 1
        else:
            print(f"  ⚠️  Contenu vide, post ignoré")
            skipped_count += 1
        
        time.sleep(0.5)  # Pause entre les requêtes
    
    # Résumé
    print("\n" + "="*60)
    print("📊 RÉSUMÉ DE LA MIGRATION")
    print("="*60)
    print(f"Posts trouvés: {len(all_posts)}")
    print(f"Posts créés: {created_count}")
    print(f"Posts ignorés: {skipped_count}")
    print("="*60)
    print("\n✅ Migration terminée!")
    print("\n💡 Prochaines étapes:")
    print("  1. Vérifier les posts créés dans content/posts/")
    print("  2. Télécharger les images manuellement si nécessaire")
    print("  3. Ajuster les catégories et villages")
    print("  4. Lancer: npm run build")
    print("  5. Commiter: git add . && git commit -m 'feat: Import WordPress archives'")

if __name__ == "__main__":
    main()
