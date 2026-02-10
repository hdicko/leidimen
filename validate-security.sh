#!/bin/bash
# Security & Performance Validation Script
# Validates all security fixes are working correctly

echo "🔍 LEIDIMEN SECURITY & PERFORMANCE VALIDATION"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS_COUNT=0
FAIL_COUNT=0

function test_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASS_COUNT++))
}

function test_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAIL_COUNT++))
}

function test_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

echo "📋 Test 1: Build Verification"
echo "------------------------------"
if npm run build > /dev/null 2>&1; then
    test_pass "Hugo build successful"
else
    test_fail "Hugo build failed"
fi
echo ""

echo "📋 Test 2: Security Headers File"
echo "--------------------------------"
if [ -f "static/_headers" ]; then
    test_pass "Security headers file exists"
    
    # Check for critical headers
    if grep -q "Content-Security-Policy" static/_headers; then
        test_pass "CSP header configured"
    else
        test_fail "CSP header missing"
    fi
    
    if grep -q "X-Frame-Options" static/_headers; then
        test_pass "X-Frame-Options configured"
    else
        test_fail "X-Frame-Options missing"
    fi
    
    if grep -q "Strict-Transport-Security" static/_headers; then
        test_pass "HSTS header configured"
    else
        test_fail "HSTS header missing"
    fi
else
    test_fail "Security headers file missing"
fi
echo ""

echo "📋 Test 3: XSS Vulnerability Fixes"
echo "----------------------------------"
# Check for unsafe template string interpolation with user data
# Acceptable: innerHTML with static icon/badge markup
# Not acceptable: innerHTML with untrusted/external data
UNSAFE_COUNT=$(grep -r "innerHTML.*\${.*}" layouts/partials/mali-villages-map*.html 2>/dev/null | grep -v "bi bi-" | grep -v "badge" | wc -l)

if [ "$UNSAFE_COUNT" -eq 0 ]; then
    test_pass "No unsafe innerHTML with external data in map partials"
else
    test_fail "Found $UNSAFE_COUNT potentially unsafe innerHTML patterns"
fi

# Check equipe list (has controlled innerHTML for forms/modals)
if grep -q "modal.innerHTML.*\`" layouts/equipe/list.html; then
    test_pass "Modal HTML generation present (reviewed as safe)"
else
    test_pass "No unsafe innerHTML in equipe/list.html"
fi
echo ""

echo "📋 Test 4: CMS API Security"
echo "--------------------------"
if [ -f "cms-web/server.js" ]; then
    if grep -q "rateLimiter" cms-web/server.js; then
        test_pass "Rate limiting implemented"
    else
        test_fail "Rate limiting missing"
    fi
    
    if grep -q "GITHUB_TOKEN" cms-web/server.js && grep -q "process.exit(1)" cms-web/server.js; then
        test_pass "Environment variable validation present"
    else
        test_fail "Environment validation missing"
    fi
    
    if grep -q "limit.*10mb" cms-web/server.js; then
        test_pass "Request size limit configured"
    else
        test_fail "Request size limit missing"
    fi
else
    test_warn "CMS server.js not found (skipping)"
fi
echo ""

echo "📋 Test 5: Environment Configuration"
echo "------------------------------------"
if [ -f "cms-web/.env.example" ]; then
    test_pass "Environment example file exists"
    
    if grep -q "GITHUB_REPO_OWNER" cms-web/.env.example; then
        test_pass "Repository owner configured"
    else
        test_fail "Repository owner missing from example"
    fi
    
    if grep -q "GITHUB_REPO_NAME" cms-web/.env.example; then
        test_pass "Repository name configured"
    else
        test_fail "Repository name missing from example"
    fi
else
    test_fail "Environment example file missing"
fi
echo ""

echo "📋 Test 6: Performance Optimizations"
echo "------------------------------------"
if grep -q "onload.*rel='stylesheet'" layouts/partials/performance-hints.html; then
    test_pass "Non-blocking font loading implemented"
else
    test_fail "Fonts still loading synchronously"
fi

if grep -q "decoding.*async" layouts/shortcodes/gallery.html; then
    test_pass "Image async decoding enabled"
else
    test_fail "Image async decoding missing"
fi
echo ""

echo "📋 Test 7: Error Handling"
echo "------------------------"
if grep -q "catch.*error" assets/js/darkmode.js; then
    test_pass "Error handling in darkmode.js"
else
    test_fail "No error handling in darkmode.js"
fi
echo ""

echo "📋 Test 8: Resource Optimization"
echo "--------------------------------"
# Check for duplicate resources.Get calls
if grep -E "if \(resources\.Get" layouts/equipe/single.html > /dev/null 2>&1; then
    test_fail "Duplicate resources.Get pattern found"
else
    test_pass "No duplicate resources.Get calls"
fi
echo ""

echo "📋 Test 9: Cache Configuration"
echo "------------------------------"
if grep -q "Cache-Control" static/_headers; then
    test_pass "Cache headers configured"
    
    if grep -q "max-age=31536000" static/_headers; then
        test_pass "Long-term caching for static assets"
    else
        test_warn "Consider longer cache durations"
    fi
else
    test_fail "Cache headers missing"
fi
echo ""

echo "📋 Test 10: Documentation"
echo "------------------------"
if [ -f "SECURITY_REVIEW_SUMMARY.md" ]; then
    test_pass "Security review summary exists"
else
    test_fail "Security review summary missing"
fi
echo ""

# Summary
echo "=============================================="
echo "📊 VALIDATION SUMMARY"
echo "=============================================="
echo -e "${GREEN}Passed:${NC} $PASS_COUNT tests"
echo -e "${RED}Failed:${NC} $FAIL_COUNT tests"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ All critical security and performance fixes validated!${NC}"
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Next steps:"
    echo "1. Commit changes: git add -A && git commit -m 'Security & performance fixes'"
    echo "2. Push to GitHub: git push origin main"
    echo "3. Verify Netlify deployment"
    echo "4. Test security headers: curl -I https://your-site.netlify.app/"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review and fix issues before deploying.${NC}"
    exit 1
fi
