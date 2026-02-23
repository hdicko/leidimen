#!/usr/bin/env python3
"""
SEO Auto-Fix Script for Leidimen Hugo Posts
Fixes critical SEO issues across all posts:
1. Description length (150-160 chars)
2. Standardize frontmatter (image vs featured_image)
3. Add missing village taxonomy
4. Ensure categories present
"""

import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple
import yaml

# Village list for auto-assignment
VILLAGES = {
    "dorool": ["dorool", "diona"],  # Related villages
    "diona": ["diona", "dorool"],
    "darawal": ["darawal"],
    "debere": ["debere"],
    "diambana": ["diambana"],
    "douentza": ["douentza"],
    "tanal": ["tanal"],
    "manko": ["manko"],
    "tacouti": ["tacouti"],
    "ndumpa": ["ndumpa"],
    "boundoucoli": ["boundoucoli"],
    "hamadoun": ["hamadoun"],
}

DEFAULT_CATEGORIES = ["Actualités"]
CONTENT_DIR = Path("content/posts")


def extract_frontmatter(content: str) -> Tuple[Dict, str]:
    """Extract YAML frontmatter from markdown file."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not match:
        return {}, content
    
    try:
        frontmatter = yaml.safe_load(match.group(1))
        body = match.group(2)
        return frontmatter or {}, body
    except yaml.YAMLError:
        return {}, content


def generate_description(post: Dict, filename: str) -> str:
    """Generate optimized description (150-160 chars)."""
    # If description already exists and is good length, keep it
    if "description" in post and isinstance(post.get("description"), str):
        desc = post["description"].strip()
        if 140 <= len(desc) <= 170:  # Allow small margin
            return desc
    
    # Extract from post content if available
    title = post.get("title", "").strip()
    villages = post.get("villages", [])
    categories = post.get("categories", [])
    
    # Build description
    parts = []
    
    # Add village if present
    if villages and isinstance(villages, list):
        village = villages[0].capitalize()
        parts.append(f"{village}:")
    
    # Add title/topic
    if title:
        # Remove quotes and extra spaces
        title_clean = title.replace('"', '').strip()
        if len(title_clean) > 50:
            title_clean = title_clean[:47] + "..."
        parts.append(title_clean)
    
    # Build base description
    base_desc = " ".join(parts) if parts else "Découvrez ce projet Leidimen"
    
    # Extend to 150-160 chars
    if len(base_desc) < 150:
        # Add category or generic text
        if categories and isinstance(categories, list):
            category = categories[0].lower()
            extension = f" - En savoir plus sur nos initiatives en {category}."
        else:
            extension = " - Retrouvez tous nos projets de solidarité avec les villages du Mali."
        
        full_desc = base_desc + extension
        
        # Trim if needed
        if len(full_desc) > 165:
            full_desc = full_desc[:160] + "."
    else:
        full_desc = base_desc
    
    return full_desc[:165]


def standardize_image_field(post: Dict) -> Dict:
    """Standardize image field: prefer 'image' over 'featured_image'."""
    if "featured_image" in post and "image" not in post:
        post["image"] = post.pop("featured_image")
    elif "featured_image" in post:
        post.pop("featured_image")
    
    return post


def add_missing_villages(post: Dict, filename: str) -> Dict:
    """Add village taxonomy if missing."""
    if "villages" in post and post["villages"]:
        return post
    
    # Try to detect village from content
    filename_lower = filename.lower()
    for village_key in VILLAGES.keys():
        if village_key in filename_lower:
            post["villages"] = VILLAGES[village_key]
            return post
    
    # Try to detect from title
    title_lower = post.get("title", "").lower()
    for village_key in VILLAGES.keys():
        if village_key in title_lower:
            post["villages"] = VILLAGES[village_key]
            return post
    
    # Default: don't add if can't determine
    return post


def ensure_categories(post: Dict) -> Dict:
    """Ensure post has at least one category."""
    if not post.get("categories") or not isinstance(post.get("categories"), list) or len(post["categories"]) == 0:
        post["categories"] = DEFAULT_CATEGORIES
    
    return post


def ensure_required_fields(post: Dict) -> Dict:
    """Ensure all required fields are present."""
    required = ["title", "date", "draft"]
    for field in required:
        if field not in post:
            if field == "draft":
                post["draft"] = False
    
    return post


def format_frontmatter(post: Dict) -> str:
    """Format dictionary as YAML frontmatter."""
    # Order of fields for consistency
    ordered = {}
    field_order = ["title", "date", "lastmod", "draft", "description", "author", "slug", 
                   "weight", "image", "categories", "tags", "villages", "moods", "type"]
    
    for field in field_order:
        if field in post:
            ordered[field] = post[field]
    
    # Add any remaining fields
    for key, value in post.items():
        if key not in ordered:
            ordered[key] = value
    
    # Convert to YAML
    yaml_str = yaml.dump(ordered, default_flow_style=False, sort_keys=False, 
                         allow_unicode=True, width=1000)
    return yaml_str


def process_post(filepath: Path) -> Tuple[bool, str]:
    """Process a single post file. Returns (changed, message)."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract frontmatter and body
        frontmatter, body = extract_frontmatter(content)
        if not frontmatter:
            return False, f"Could not parse frontmatter"
        
        original = str(frontmatter)
        filename = filepath.stem
        
        # Apply fixes
        # 1. Standardize image field
        frontmatter = standardize_image_field(frontmatter)
        
        # 2. Fix description
        frontmatter["description"] = generate_description(frontmatter, filename)
        
        # 3. Add missing villages
        frontmatter = add_missing_villages(frontmatter, filename)
        
        # 4. Ensure categories
        frontmatter = ensure_categories(frontmatter)
        
        # 5. Ensure required fields
        frontmatter = ensure_required_fields(frontmatter)
        
        # Check if changed
        if str(frontmatter) == original:
            return False, "No changes needed"
        
        # Rebuild file content
        yaml_content = format_frontmatter(frontmatter)
        new_content = f"---\n{yaml_content}---\n{body}"
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, "Fixed"
    
    except Exception as e:
        return False, f"Error: {str(e)}"


def main():
    """Main function."""
    print("🔍 SEO Auto-Fix: Leidimen Hugo Posts")
    print("=" * 50)
    
    # Find all posts
    post_files = sorted(CONTENT_DIR.glob("**/*.md"))
    
    if not post_files:
        print(f"❌ No posts found in {CONTENT_DIR}")
        return
    
    print(f"📊 Found {len(post_files)} posts")
    print()
    
    # Process posts
    fixed = 0
    errors = 0
    unchanged = 0
    
    for i, filepath in enumerate(post_files, 1):
        changed, message = process_post(filepath)
        
        if changed:
            fixed += 1
            status = "✅"
        else:
            unchanged += 1
            status = "⏭️ "
        
        # Show progress
        if i % 10 == 0 or changed:
            rel_path = filepath.relative_to(CONTENT_DIR)
            print(f"{status} [{i:3d}/{len(post_files)}] {rel_path}")
    
    # Summary
    print()
    print("=" * 50)
    print(f"✅ Fixed: {fixed}")
    print(f"⏭️  Unchanged: {unchanged}")
    print(f"❌ Errors: {errors}")
    print()
    print("🎉 SEO Auto-Fix Complete!")


if __name__ == "__main__":
    main()
