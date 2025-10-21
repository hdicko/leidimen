/**
 * Dark Mode Toggle
 * Manages dark/light theme switching and persists user preference
 */

(function() {
  'use strict';

  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  const body = document.body;

  // Check for saved user preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply the saved theme on page load
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    updateIcon(true);
  }

  // Toggle dark mode on button click
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      
      // Save the user's preference
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      
      // Update the icon
      updateIcon(isDarkMode);
      
      // Add a subtle animation
      this.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
      }, 300);
    });
  }

  // Update the icon based on the current mode
  function updateIcon(isDarkMode) {
    if (darkModeIcon) {
      if (isDarkMode) {
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun-fill');
      } else {
        darkModeIcon.classList.remove('bi-sun-fill');
        darkModeIcon.classList.add('bi-moon-fill');
      }
    }
  }

  // Listen for system theme changes (optional)
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeMediaQuery.addEventListener('change', function(e) {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          body.classList.add('dark-mode');
          updateIcon(true);
        } else {
          body.classList.remove('dark-mode');
          updateIcon(false);
        }
      }
    });
  }
})();
