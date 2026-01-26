---
name: redesignUiSection
description: Redesign a UI section with custom color scheme and enhanced styling
argument-hint: section identifier and desired color scheme or design specifications
---

# Redesign UI Section with Custom Styling

Transform a UI section with enhanced visual design including custom color schemes, gradients, shadows, and hover effects while maintaining responsive behavior.

## Instructions:

1. **Identify the target section**:
   - Locate the HTML/template code for the specified UI section
   - Understand the current structure and styling approach
   - Note any related CSS or JavaScript dependencies

2. **Apply the specified color scheme**:
   - Replace background colors with gradient backgrounds if requested
   - Update text colors for proper contrast and readability
   - Change accent colors (borders, buttons, badges, icons)
   - Ensure accessibility (WCAG AA contrast ratios)

3. **Enhance visual design**:
   - Add border-radius for rounded corners (8px-15px)
   - Include box-shadow for depth (e.g., `0 4px 15px rgba(0,0,0,0.1)`)
   - Increase padding for breathing room (1.5rem-3rem)
   - Add icons to headers/titles when appropriate

4. **Implement hover effects and animations**:
   - Add smooth transitions (0.3s ease)
   - Include hover states for interactive elements:
     - translateY(-3px to -5px) for lift effect
     - Enhanced shadow on hover
     - Border or background color changes
     - Scale transformations (1.05-1.1)

5. **Update button styling**:
   - Change from outline to solid buttons or vice versa
   - Ensure consistent sizing (padding, width)
   - Add icons to buttons where meaningful
   - Implement hover/focus states

6. **Maintain responsive design**:
   - Verify Bootstrap grid classes are appropriate
   - Test on mobile breakpoints (@media queries)
   - Adjust spacing for smaller screens

7. **Consider CSS organization**:
   - Use inline styles for unique one-off styling
   - Move reusable styles to external CSS files
   - Add custom CSS classes for component styling
   - Document any new CSS added

## Common Color Schemes:

- **Professional Gray**: `linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)`
- **Dark Anthracite**: `linear-gradient(135deg, #2c3e50 0%, #34495e 100%)`
- **Blue Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Green Accent**: `linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)`

## Example Transformation:

**Before:**
```html
<div class="card bg-primary bg-opacity-5">
  <div class="card-body p-4">
    <h5>Navigation rapide</h5>
    <div class="row">
      <a class="btn btn-outline-primary">Link</a>
    </div>
  </div>
</div>
```

**After:**
```html
<div class="card shadow-sm" style="background: linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%); border-radius: 15px;">
  <div class="card-body p-5">
    <h5 class="text-white fw-bold mb-4">
      <i class="bi bi-signpost-2 me-2"></i>
      Navigation rapide
    </h5>
    <div class="row g-4">
      <a class="btn btn-light py-3 quick-nav-btn">Link</a>
    </div>
  </div>
</div>

<style>
.quick-nav-btn {
  transition: all 0.3s ease;
  border-radius: 10px;
}
.quick-nav-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
</style>
```
