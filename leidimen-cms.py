#!/usr/bin/env python3
"""
Leidimen Content Management System
CLI interactif pour créer des posts Hugo via GitHub MCP
"""

import os
import sys
import json
from datetime import datetime
from pathlib import Path
import subprocess
import re

# Configuration
REPO_OWNER = "hdicko"
REPO_NAME = "leidimen"
REPO_PATH = Path(__file__).parent

# Données de référence
VILLAGES = ["dorool", "diona", "debere", "diambana", "darawal", "tanal", "manko", "tacouti", "n'dumpa", "douentza"]
CATEGORIES = ["Éducation", "Santé", "Infrastructure", "Agriculture", "Culture", "Économie"]
MOODS = ["heureux", "triste", "inspiré", "motivé", "reconnaissant", "déterminé"]

def print_header():
    """Affiche l'en-tête du CMS"""
    print("\n" + "="*60)
    print("🏛️  LEIDIMEN CONTENT MANAGEMENT SYSTEM")
    print("="*60 + "\n")

def create_slug(title):
    """Crée un slug à partir du titre"""
    slug = title.lower()
    slug = re.sub(r'[àáâãäå]', 'a', slug)
    slug = re.sub(r'[èéêë]', 'e', slug)
    slug = re.sub(r'[ìíîï]', 'i', slug)
    slug = re.sub(r'[òóôõö]', 'o', slug)
    slug = re.sub(r'[ùúûü]', 'u', slug)
    slug = re.sub(r'[ç]', 'c', slug)
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def prompt_input(question, default=None, required=True):
    """Demande une entrée utilisateur"""
    if default:
        prompt = f"{question} [{default}]: "
    else:
        prompt = f"{question}: "
    
    while True:
        value = input(prompt).strip()
        if value:
            return value
        elif default:
            return default
        elif not required:
            return ""
        else:
            print("❌ Cette information est requise. Veuillez réessayer.")

def prompt_select(question, choices, multiple=False):
    """Demande une sélection parmi des choix"""
    print(f"\n{question}")
    for i, choice in enumerate(choices, 1):
        print(f"  {i}. {choice}")
    
    if multiple:
        print("\n💡 Entrez les numéros séparés par des virgules (ex: 1,3,5)")
        while True:
            response = input("Votre choix: ").strip()
            try:
                indices = [int(x.strip()) - 1 for x in response.split(',')]
                if all(0 <= i < len(choices) for i in indices):
                    return [choices[i] for i in indices]
                else:
                    print("❌ Numéro invalide. Réessayez.")
            except ValueError:
                print("❌ Format invalide. Utilisez des numéros séparés par des virgules.")
    else:
        while True:
            try:
                choice = int(input("Votre choix: ").strip())
                if 1 <= choice <= len(choices):
                    return choices[choice - 1]
                else:
                    print(f"❌ Choisissez un numéro entre 1 et {len(choices)}")
            except ValueError:
                print("❌ Veuillez entrer un numéro valide")

def prompt_confirm(question, default=True):
    """Demande une confirmation oui/non"""
    suffix = "[O/n]" if default else "[o/N]"
    while True:
        response = input(f"{question} {suffix}: ").strip().lower()
        if response in ['o', 'oui', 'y', 'yes']:
            return True
        elif response in ['n', 'non', 'no']:
            return False
        elif response == '':
            return default
        else:
            print("❌ Répondez par 'o' (oui) ou 'n' (non)")

def generate_frontmatter(data):
    """Génère le frontmatter YAML"""
    frontmatter = f"""---
title: "{data['title']}"
date: {data['date']}
villages: {json.dumps(data['villages'])}
categories: {json.dumps(data['categories'])}
tags: {json.dumps(data['tags'])}
moods: {json.dumps(data['moods'])}
description: "{data['description']}"
image: "{data['image']}"
draft: {str(data['draft']).lower()}
---

"""
    return frontmatter

def create_post_interactive():
    """Mode interactif pour créer un post"""
    print("\n📝 CRÉATION D'UN NOUVEAU POST\n")
    
    # Collecte des informations
    post_data = {}
    
    # Titre
    post_data['title'] = prompt_input("📌 Titre du post")
    slug = create_slug(post_data['title'])
    print(f"   → Slug: {slug}")
    
    # Date
    today = datetime.now().strftime("%Y-%m-%d")
    post_data['date'] = prompt_input("📅 Date de publication", default=today)
    
    # Villages
    print("\n🏘️  Sélection des villages")
    post_data['villages'] = prompt_select("Choisissez le(s) village(s):", VILLAGES, multiple=True)
    
    # Catégories
    print("\n📂 Sélection de la catégorie")
    category = prompt_select("Choisissez une catégorie:", CATEGORIES, multiple=False)
    post_data['categories'] = [category]
    
    # Tags
    print("\n🏷️  Tags (mots-clés)")
    tags_input = prompt_input("Entrez les tags séparés par des virgules", required=False)
    post_data['tags'] = [tag.strip() for tag in tags_input.split(',')] if tags_input else []
    
    # Moods
    print("\n😊 Sélection du mood")
    mood = prompt_select("Choisissez un mood:", MOODS, multiple=False)
    post_data['moods'] = [mood]
    
    # Description SEO
    post_data['description'] = prompt_input("📄 Description SEO (150-160 caractères)")
    
    # Image
    post_data['image'] = prompt_input("🖼️  Chemin de l'image", default="/images/uploads/default.jpg")
    
    # Draft
    post_data['draft'] = not prompt_confirm("📢 Publier immédiatement?", default=True)
    
    # Contenu
    print("\n✍️  CONTENU DU POST")
    print("💡 Entrez le contenu (tapez 'END' sur une ligne seule pour terminer):\n")
    content_lines = []
    while True:
        line = input()
        if line.strip() == 'END':
            break
        content_lines.append(line)
    
    content = '\n'.join(content_lines)
    
    # Résumé
    print("\n" + "="*60)
    print("📋 RÉSUMÉ DU POST")
    print("="*60)
    print(f"Titre      : {post_data['title']}")
    print(f"Date       : {post_data['date']}")
    print(f"Villages   : {', '.join(post_data['villages'])}")
    print(f"Catégorie  : {', '.join(post_data['categories'])}")
    print(f"Tags       : {', '.join(post_data['tags']) if post_data['tags'] else 'Aucun'}")
    print(f"Mood       : {', '.join(post_data['moods'])}")
    print(f"Image      : {post_data['image']}")
    print(f"Draft      : {'Oui' if post_data['draft'] else 'Non'}")
    print(f"Contenu    : {len(content)} caractères")
    print("="*60 + "\n")
    
    if not prompt_confirm("✅ Confirmer la création?"):
        print("❌ Création annulée")
        return None
    
    # Génération du fichier
    year = post_data['date'].split('-')[0]
    file_path = f"content/posts/{year}/{slug}.md"
    full_content = generate_frontmatter(post_data) + content
    
    return {
        'path': file_path,
        'content': full_content,
        'slug': slug,
        'title': post_data['title']
    }

def save_post_local(post_info):
    """Sauvegarde le post localement"""
    file_path = REPO_PATH / post_info['path']
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(post_info['content'])
    
    print(f"✅ Fichier créé: {file_path}")
    return file_path

def git_commit_and_push(file_path, title):
    """Commit et push via git local"""
    try:
        # Git add
        subprocess.run(['git', 'add', str(file_path)], 
                      cwd=REPO_PATH, check=True, capture_output=True)
        
        # Git commit
        commit_msg = f"feat: Add post - {title}"
        subprocess.run(['git', 'commit', '-m', commit_msg], 
                      cwd=REPO_PATH, check=True, capture_output=True)
        
        # Git push
        result = subprocess.run(['git', 'push', 'origin', 'main'], 
                               cwd=REPO_PATH, check=True, capture_output=True, text=True)
        
        print(f"✅ Commit: {commit_msg}")
        print(f"✅ Poussé sur GitHub")
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Erreur Git: {e.stderr if e.stderr else str(e)}")
        return False

def create_post_bundle():
    """Crée un post avec galerie (page bundle)"""
    print("\n📸 CRÉATION D'UN POST AVEC GALERIE\n")
    
    # Titre
    title = prompt_input("📌 Titre du post")
    slug = create_slug(title)
    
    # Date
    today = datetime.now().strftime("%Y-%m-%d")
    date = prompt_input("📅 Date de publication", default=today)
    year = date.split('-')[0]
    
    # Villages
    villages = prompt_select("Choisissez le(s) village(s):", VILLAGES, multiple=True)
    
    # Catégorie
    category = prompt_select("Choisissez une catégorie:", CATEGORIES, multiple=False)
    
    # Mood
    mood = prompt_select("Choisissez un mood:", MOODS, multiple=False)
    
    # Description
    description = prompt_input("📄 Description SEO (150-160 caractères)")
    
    # Créer la structure
    bundle_path = REPO_PATH / f"content/posts/{year}/{slug}"
    bundle_path.mkdir(parents=True, exist_ok=True)
    
    # Créer index.md
    frontmatter = f"""---
title: "{title}"
date: {date}
villages: {json.dumps(villages)}
categories: {json.dumps([category])}
moods: {json.dumps([mood])}
description: "{description}"
draft: false
---

{prompt_input("✍️  Introduction (optionnel)", required=False)}

{{{{< gallery >}}}}
"""
    
    index_file = bundle_path / "index.md"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
    
    print(f"\n✅ Structure créée: {bundle_path}")
    print(f"📁 Copiez vos images dans: {bundle_path}/")
    print(f"📝 Le fichier index.md a été créé avec le shortcode gallery")
    
    if prompt_confirm("\n💾 Voulez-vous commiter maintenant?"):
        git_commit_and_push(index_file, title)
    
    return bundle_path

def main_menu():
    """Menu principal"""
    print_header()
    
    while True:
        print("\n📋 QUE VOULEZ-VOUS FAIRE?\n")
        print("  1. Créer un nouveau post (article simple)")
        print("  2. Créer un post avec galerie (page bundle)")
        print("  3. Lister les posts récents")
        print("  4. Quitter")
        
        choice = input("\nVotre choix: ").strip()
        
        if choice == '1':
            post_info = create_post_interactive()
            if post_info:
                file_path = save_post_local(post_info)
                
                if prompt_confirm("\n💾 Voulez-vous commiter et pusher sur GitHub?"):
                    if git_commit_and_push(file_path, post_info['title']):
                        print(f"\n🌐 Le post sera bientôt visible sur:")
                        print(f"   https://hdicko.github.io/leidimen/posts/{post_info['path'].split('/')[-2]}/{post_info['slug']}/")
                else:
                    print("\n💡 N'oubliez pas de commiter manuellement:")
                    print(f"   git add {post_info['path']}")
                    print(f"   git commit -m 'feat: Add post - {post_info['title']}'")
                    print(f"   git push origin main")
        
        elif choice == '2':
            create_post_bundle()
        
        elif choice == '3':
            # Lister les posts récents
            posts_dir = REPO_PATH / "content/posts"
            print("\n📚 POSTS RÉCENTS:\n")
            
            md_files = sorted(posts_dir.rglob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:10]
            
            for i, post_file in enumerate(md_files, 1):
                # Lire le titre
                with open(post_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    title_match = re.search(r'^title:\s*["\'](.+)["\']', content, re.MULTILINE)
                    title = title_match.group(1) if title_match else post_file.stem
                
                rel_path = post_file.relative_to(REPO_PATH)
                print(f"  {i}. {title}")
                print(f"     📁 {rel_path}\n")
        
        elif choice == '4':
            print("\n👋 Au revoir!\n")
            break
        
        else:
            print("❌ Choix invalide")

if __name__ == "__main__":
    try:
        main_menu()
    except KeyboardInterrupt:
        print("\n\n👋 Au revoir!\n")
        sys.exit(0)
