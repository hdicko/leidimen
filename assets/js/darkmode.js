/**
 * Dark Mode Toggle Module
 * Manages dark/light theme switching with modern ES6+ patterns
 * Features:
 * - Persists user preference in localStorage
 * - Synchronizes body.dark-mode class and data-bs-theme attribute
 * - Responds to system theme changes
 * - Provides smooth animations
 *
 * @module DarkMode
 */

class DarkModeManager {
	/**
	 * Theme configuration constants
	 */
	static THEMES = {
		DARK: 'dark',
		LIGHT: 'light',
	};

	static STORAGE_KEY = 'theme';
	static ANIMATION_DURATION = 300;

	/**
	 * Initialize the dark mode manager
	 */
	constructor() {
		this.elements = {
			toggle: document.getElementById('darkModeToggle'),
			icon: document.getElementById('darkModeIcon'),
			body: document.body,
			html: document.documentElement,
		};

		this.init();
	}

	/**
	 * Initialize theme and event listeners
	 */
	init() {
		try {
			// Apply saved theme on load
			const savedTheme = this.getSavedTheme();
			this.applyTheme(savedTheme);

			// Setup event listeners
			this.setupToggleListener();
			this.setupSystemThemeListener();

			// Expose global function for backward compatibility
			window.myFunction = () => this.toggle();
		} catch (error) {
			console.error('DarkMode initialization failed:', error);
			// Fallback to light theme
			this.applyTheme(DarkModeManager.THEMES.LIGHT);
		}
	}

	/**
	 * Get saved theme from localStorage
	 * @returns {string} - 'dark' or 'light'
	 */
	getSavedTheme() {
		return localStorage.getItem(DarkModeManager.STORAGE_KEY) || DarkModeManager.THEMES.LIGHT;
	}

	/**
	 * Check if current theme is dark
	 * @returns {boolean}
	 */
	isDarkMode() {
		return this.elements.body.classList.contains('dark-mode');
	}

	/**
	 * Toggle between dark and light themes
	 */
	toggle() {
		const newTheme = this.isDarkMode() ? DarkModeManager.THEMES.LIGHT : DarkModeManager.THEMES.DARK;
		this.applyTheme(newTheme);
		this.saveTheme(newTheme);
		this.animateToggle();
	}

	/**
	 * Apply theme to page elements
	 * @param {string} theme - 'dark' or 'light'
	 */
	applyTheme(theme) {
		const isDark = theme === DarkModeManager.THEMES.DARK;

		// Update classes and attributes
		this.elements.body.classList.toggle('dark-mode', isDark);

		const themeValue = isDark ? 'dark' : 'light';
		this.elements.html.setAttribute('data-bs-theme', themeValue);
		this.elements.body.setAttribute('data-bs-theme', themeValue);

		// Update icon
		this.updateIcon(isDark);
	}

	/**
	 * Update the theme icon
	 * @param {boolean} isDark - Whether dark mode is active
	 */
	updateIcon(isDark) {
		if (!this.elements.icon) return;

		const iconClasses = {
			dark: { remove: 'bi-moon-fill', add: 'bi-sun-fill' },
			light: { remove: 'bi-sun-fill', add: 'bi-moon-fill' },
		};

		const classes = isDark ? iconClasses.dark : iconClasses.light;
		this.elements.icon.classList.remove(classes.remove);
		this.elements.icon.classList.add(classes.add);
	}

	/**
	 * Save theme preference to localStorage
	 * @param {string} theme - Theme to save
	 */
	saveTheme(theme) {
		localStorage.setItem(DarkModeManager.STORAGE_KEY, theme);
	}

	/**
	 * Animate the toggle button
	 */
	animateToggle() {
		if (!this.elements.toggle) return;

		this.elements.toggle.style.transform = 'rotate(360deg)';
		setTimeout(() => {
			this.elements.toggle.style.transform = 'rotate(0deg)';
		}, DarkModeManager.ANIMATION_DURATION);
	}

	/**
	 * Setup click listener for toggle button
	 */
	setupToggleListener() {
		if (!this.elements.toggle) return;

		this.elements.toggle.addEventListener('click', () => this.toggle());
	}

	/**
	 * Setup listener for system theme changes
	 */
	setupSystemThemeListener() {
		if (!window.matchMedia) return;

		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

		darkModeQuery.addEventListener('change', (e) => {
			// Only auto-switch if user hasn't manually set a preference
			if (!localStorage.getItem(DarkModeManager.STORAGE_KEY)) {
				const theme = e.matches ? DarkModeManager.THEMES.DARK : DarkModeManager.THEMES.LIGHT;
				this.applyTheme(theme);
			}
		});
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => new DarkModeManager());
} else {
	new DarkModeManager();
}
