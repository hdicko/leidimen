---
name: anonymizeContactInfo
description: Replace real contact information with dummy placeholders across the codebase
argument-hint: contact type (phone, email, address) and files/directories to search
---

# Anonymize Contact Information

Search the codebase for real contact information (phone numbers, email addresses, physical addresses) and replace them with appropriate placeholder/dummy values while maintaining the format.

## Instructions:

1. **Search for contact patterns** across configuration files, content files, and templates:
   - Phone numbers (various formats: +33XXXXXXXXX, (XXX) XXX-XXXX, etc.)
   - Email addresses (real@domain.com)
   - Physical addresses (street numbers, specific locations)

2. **Replace with appropriate dummy values**:
   - Phone: Replace with format-preserving placeholders (e.g., `+33 6 XX XX XX XX`, `+223 XX XX XX XX`)
   - Email: Consider keeping or replacing with generic email (e.g., `contact@example.com`)
   - Address: Replace specific details with placeholders while keeping structure

3. **Search in these locations**:
   - Configuration files (e.g., `*.toml`, `*.yaml`, `*.json`, `.env`)
   - Content files (e.g., `*.md`, `*.html`)
   - Template files (e.g., partials, layouts)
   - Data files

4. **Use multi-file replacement** when multiple instances exist for efficiency

5. **Maintain format consistency**:
   - Keep the same structure/format as the original
   - Ensure placeholders are clearly recognizable as non-real data
   - Use 'X' for digits in phone numbers
   - Preserve country codes and area code structure

6. **Provide a summary** of all replacements made with file paths

## Example Replacements:

- `+33603751327` → `+33 6 XX XX XX XX`
- `+223 674 83 87` → `+223 XX XX XX XX`
- `john.doe@company.com` → `contact@example.com`
- `123 Main Street, City` → `XXX Street Name, City`
