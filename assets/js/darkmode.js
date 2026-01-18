/**
 * Dark Mode Toggle
 * Manages dark/light theme switching and persists user preference
 * Synchronizes both body.dark-mode class and data-bs-theme attribute
 */

(function () {
	'use strict';

	const darkModeToggle = document.getElementById('darkModeToggle');
	const darkModeIcon = document.getElementById('darkModeIcon');
	const body = document.body;
	const htmlElement = document.documentElement;

	// Check for saved user preference or default to light mode
	const currentTheme = localStorage.getItem('theme') || 'light';

	// Apply the saved theme on page load
	if (currentTheme === 'dark') {
		applyDarkMode(true);
	}

	// Toggle dark mode on button click
	if (darkModeToggle) {
		darkModeToggle.addEventListener('click', function () {
			const isDarkMode = !body.classList.contains('dark-mode');
			
			// Apply the theme
			applyDarkMode(isDarkMode);

			// Save the user's preference
			localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

			// Add a subtle animation
			this.style.transform = 'rotate(360deg)';
			setTimeout(() => {
				this.style.transform = 'rotate(0deg)';
			}, 300);
		});
	}

	// Function to apply dark mode consistently
	function applyDarkMode(isDark) {
		if (isDark) {
			body.classList.add('dark-mode');
			htmlElement.setAttribute('data-bs-theme', 'dark');
			body.setAttribute('data-bs-theme', 'dark');
		} else {
			body.classList.remove('dark-mode');
			htmlElement.setAttribute('data-bs-theme', 'light');
			body.setAttribute('data-bs-theme', 'light');
		}
		updateIcon(isDark);
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

		darkModeMediaQuery.addEventListener('change', function (e) {
			// Only auto-switch if user hasn't manually set a preference
			if (!localStorage.getItem('theme')) {
				applyDarkMode(e.matches);
			}
		});
	}

	// Expose function globally for backward compatibility
	window.myFunction = function() {
		const isDarkMode = !body.classList.contains('dark-mode');
		applyDarkMode(isDarkMode);
		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
	};
})();
