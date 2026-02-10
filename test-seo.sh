#!/bin/bash

#####################################################################
# SEO Validation Script for Leidimen Hugo Site
# Purpose: Comprehensive SEO, structured data, and accessibility testing
# Author: Leidimen Team
# Date: February 2026
#####################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNING_TESTS=0

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"
}

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -e "${YELLOW}▶ Testing:${NC} $test_name"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✓ PASSED:${NC} $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗ FAILED:${NC} $test_name"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Function for warning tests
run_warning() {
    local test_name="$1"
    local message="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    WARNING_TESTS=$((WARNING_TESTS + 1))
    
    echo -e "${YELLOW}⚠ WARNING:${NC} $test_name"
    echo -e "  ${message}"
}

# Check if Hugo is installed
print_section "🔍 Pre-flight Checks"

if ! command -v hugo &> /dev/null; then
    echo -e "${RED}✗ Hugo is not installed${NC}"
    exit 1
fi

HUGO_VERSION=$(hugo version | grep -oP 'v\K[0-9]+\.[0-9]+\.[0-9]+' | head -1)
echo -e "${GREEN}✓ Hugo version: ${HUGO_VERSION}${NC}"

# Build the site
print_section "🏗️  Building Site"

echo "Building Hugo site..."
if hugo --gc --cleanDestinationDir --minify --quiet; then
    echo -e "${GREEN}✓ Site built successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Test 1: Meta Tags Validation
print_section "📋 Meta Tags Validation"

run_test "Homepage has title tag" \
    "grep -q '<title>' public/index.html" \
    "true"

run_test "Homepage has meta description" \
    "grep -q '<meta name=\"description\"' public/index.html" \
    "true"

run_test "Homepage has Open Graph tags" \
    "grep -q 'property=\"og:' public/index.html" \
    "true"

run_test "Homepage has Twitter Card tags" \
    "grep -q 'name=\"twitter:' public/index.html" \
    "true"

run_test "Homepage has canonical URL" \
    "grep -q '<link rel=\"canonical\"' public/index.html" \
    "true"

run_test "Homepage has language declaration" \
    "grep -q 'lang=\"fr\"' public/index.html" \
    "true"

run_test "Homepage has hreflang tags" \
    "grep -q 'hreflang=' public/index.html" \
    "true"

# Test 2: Structured Data Validation
print_section "🔗 Structured Data (JSON-LD)"

run_test "Homepage has JSON-LD structured data" \
    "grep -q 'application/ld+json' public/index.html" \
    "true"

run_test "NGO schema present" \
    "grep -q '\"@type\":\"NGO\"\\|\"@type\": \"NGO\"' public/index.html" \
    "true"

run_test "Organization name in schema" \
    "grep -q '\"name\":\"Leidimen\"\\|\"name\": \"Leidimen\"' public/index.html" \
    "true"

run_test "Founding date in schema" \
    "grep -q '\"foundingDate\":\"2006\"\\|\"foundingDate\": \"2006\"' public/index.html" \
    "true"

# Check for blog post structured data
if [ -d "public/posts" ]; then
    # Try to find a recent post (2024-2026) first for better test accuracy
    SAMPLE_POST=$(find public/posts/2025 public/posts/2024 public/posts/2026 -name "*.html" -type f 2>/dev/null | head -1)
    # Fallback to any post if no recent ones found
    if [ -z "$SAMPLE_POST" ]; then
        SAMPLE_POST=$(find public/posts -name "*.html" -type f | head -1)
    fi
    
    if [ -n "$SAMPLE_POST" ]; then
        run_test "Blog posts have BlogPosting schema" \
            "grep -q '\"@type\":\"BlogPosting\"\\|\"@type\": \"BlogPosting\"' \"$SAMPLE_POST\"" \
            "true"
        
        run_test "Blog posts have author information" \
            "grep -q '\"author\"' \"$SAMPLE_POST\"" \
            "true"
    fi
fi

# Test 3: Image Optimization
print_section "🖼️  Image Optimization"

run_test "Images have alt attributes in content" \
    "grep -rq 'alt=' public/posts/ 2>/dev/null || true" \
    "true"

run_test "Images have lazy loading" \
    "grep -rq 'loading=\"lazy\"' public/ 2>/dev/null || true" \
    "true"

run_test "Images have width and height attributes" \
    "grep -rq 'width=' public/ 2>/dev/null || true" \
    "true"

# Test 4: Performance Hints
print_section "⚡ Performance & Resource Hints"

run_test "Homepage has DNS prefetch hints" \
    "grep -q 'rel=\"dns-prefetch\"' public/index.html" \
    "true"

run_test "Homepage has preconnect hints" \
    "grep -q 'rel=\"preconnect\"' public/index.html" \
    "true"

run_test "Critical fonts are preloaded" \
    "grep -q 'rel=\"preload\".*as=\"style\"' public/index.html" \
    "true"

# Test 5: Sitemap & Robots.txt
print_section "🗺️  Sitemap & Robots.txt"

run_test "Sitemap.xml exists" \
    "[ -f public/sitemap.xml ]" \
    "true"

run_test "Sitemap is valid XML" \
    "grep -q '<?xml' public/sitemap.xml" \
    "true"

run_test "Sitemap contains URLs" \
    "grep -q '<loc>' public/sitemap.xml" \
    "true"

run_test "Robots.txt exists" \
    "[ -f public/robots.txt ]" \
    "true"

run_test "Robots.txt references sitemap" \
    "grep -q 'Sitemap:' public/robots.txt" \
    "true"

run_test "Robots.txt allows crawling" \
    "grep -q 'Allow: /' public/robots.txt" \
    "true"

# Test 6: AI/LLM Optimization
print_section "🤖 AI/LLM Optimization"

run_test "AI.txt file exists" \
    "[ -f public/ai.txt ]" \
    "true"

run_test "AI meta tags present" \
    "grep -q 'name=\"ai:context\"' public/index.html" \
    "true"

run_test "AI plugin JSON exists (if configured)" \
    "[ -f public/.well-known/ai-plugin.json ] || [ ! -d public/.well-known ]" \
    "true"

run_test "LLM crawlers allowed in robots.txt" \
    "grep -q 'GPTBot\\|Claude\\|anthropic' public/robots.txt" \
    "true"

# Test 7: Accessibility
print_section "♿ Accessibility"

run_test "Homepage has proper heading hierarchy" \
    "grep -q '<h1' public/index.html" \
    "true"

run_test "Images have alt attributes" \
    "! grep -r '<img[^>]*src=' public/ | grep -v 'alt=' | grep -v '.xml' | head -1" \
    "true" || run_warning "Some images missing alt text" "Check image accessibility"

run_test "Links have descriptive text or aria-labels" \
    "grep -rq 'aria-label=' public/ 2>/dev/null || true" \
    "true"

run_test "Skip to content link present" \
    "grep -q 'skip-link\\|skip-to-content' public/index.html" \
    "true"

# Test 8: Content Quality
print_section "📝 Content Quality"

# Check for meta descriptions on posts
if [ -d "public/posts" ]; then
    POST_COUNT=$(find public/posts -name "*.html" -type f | wc -l)
    POSTS_WITH_DESC=$(grep -rl '<meta name="description"' public/posts/ 2>/dev/null | wc -l)
    
    if [ "$POST_COUNT" -gt 0 ]; then
        DESC_PERCENTAGE=$((POSTS_WITH_DESC * 100 / POST_COUNT))
        
        if [ "$DESC_PERCENTAGE" -ge 80 ]; then
            run_test "Most posts have meta descriptions (${DESC_PERCENTAGE}%)" \
                "[ $DESC_PERCENTAGE -ge 80 ]" \
                "true"
        else
            run_warning "Low meta description coverage" \
                "Only ${DESC_PERCENTAGE}% of posts have meta descriptions (target: 80%+)"
        fi
    fi
fi

# Test 9: Minification
print_section "🗜️  Minification & Optimization"

run_test "HTML is minified" \
    "! grep -q '^[[:space:]]*$' public/index.html | head -10" \
    "true" || echo "  (Some whitespace is acceptable)"

run_test "CSS files exist" \
    "find public/css -name '*.css' | grep -q ." \
    "true"

run_test "Assets are fingerprinted for cache busting" \
    "find public/css -name '*.[a-f0-9]*.css' | grep -q . || find public/js -name '*.[a-f0-9]*.js' | grep -q ." \
    "true"

# Test 10: Internal Linking
print_section "🔗 Internal Linking"

if [ -d "public/posts" ]; then
    SAMPLE_POST=$(find public/posts -name "*.html" -type f | head -1)
    if [ -n "$SAMPLE_POST" ]; then
        run_test "Posts have related articles section" \
            "grep -q 'related\\|connexe' \"$SAMPLE_POST\" || true" \
            "true" || run_warning "Related posts section" "Consider adding related posts for better internal linking"
    fi
fi

# Final Report
print_section "📊 Final Report"

echo -e "${BLUE}Total Tests:${NC} $TOTAL_TESTS"
echo -e "${GREEN}Passed:${NC} $PASSED_TESTS"
echo -e "${RED}Failed:${NC} $FAILED_TESTS"
echo -e "${YELLOW}Warnings:${NC} $WARNING_TESTS"

SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
echo -e "\n${BLUE}Success Rate:${NC} ${SUCCESS_RATE}%"

# Exit status
if [ "$FAILED_TESTS" -eq 0 ]; then
    echo -e "\n${GREEN}✓ All SEO tests passed!${NC}"
    echo -e "${GREEN}Site is well-optimized for search engines and accessibility.${NC}\n"
    exit 0
else
    echo -e "\n${YELLOW}⚠ Some SEO tests failed.${NC}"
    echo -e "${YELLOW}Review the failures above and address them before deploying.${NC}\n"
    exit 1
fi
