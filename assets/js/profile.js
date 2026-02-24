// assets/js/profile.js
// Profile page interactions and utilities

/**
 * Profile Action Handler
 * Handles contact and share actions using event delegation
 */
class ProfileActionHandler {
	constructor() {
		this.init();
	}

	init() {
		// Use event delegation for better performance
		document.addEventListener('click', (e) => {
			const button = e.target.closest('[data-action]');
			if (!button) return;

			const action = button.dataset.action;

			switch (action) {
				case 'contact':
					this.handleContact(button.dataset.memberName);
					break;
				case 'share':
					this.handleShare(button.dataset.url, button.dataset.title);
					break;
			}
		});
	}

	/**
	 * Open contact modal for member
	 * @param {string} memberName - Name of the team member
	 */
	handleContact(memberName) {
		// Check if a contact modal function exists globally
		if (typeof openContactModal === 'function') {
			openContactModal(memberName);
			return;
		}

		// Fallback: scroll to contact section or show alert
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: 'smooth' });
		} else {
			alert(`Pour contacter ${memberName}, veuillez utiliser le formulaire de contact.`);
		}
	}

	/**
	 * Handle profile sharing with Web Share API or fallback
	 * @param {string} url - Profile URL to share
	 * @param {string} title - Profile title
	 */
	async handleShare(url, title) {
		const shareData = {
			title: `Profil de ${title} - Leidimen`,
			text: `Découvrez le profil de ${title} sur Leidimen`,
			url: url,
		};

		// Use Web Share API if available
		if (navigator.share) {
			try {
				await navigator.share(shareData);
				console.log('Profile shared successfully');
			} catch (err) {
				// User cancelled or error occurred
				if (err.name !== 'AbortError') {
					this.fallbackShare(url);
				}
			}
		} else {
			this.fallbackShare(url);
		}
	}

	/**
	 * Fallback sharing: copy to clipboard
	 * @param {string} url - URL to copy
	 */
	async fallbackShare(url) {
		try {
			await navigator.clipboard.writeText(url);
			this.showNotification('Lien copié dans le presse-papiers !');
		} catch (err) {
			// Fallback: show URL in prompt
			prompt('Copier le lien:', url);
		}
	}

	/**
	 * Show temporary notification
	 * @param {string} message - Message to display
	 */
	showNotification(message) {
		const notification = document.createElement('div');
		notification.className = 'profile-notification';
		notification.textContent = message;
		notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      animation: slideInUp 0.3s ease-out;
    `;

		document.body.appendChild(notification);

		// Remove after 3 seconds
		setTimeout(() => {
			notification.style.animation = 'slideOutDown 0.3s ease-in';
			setTimeout(() => notification.remove(), 300);
		}, 3000);
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		new ProfileActionHandler();
	});
} else {
	new ProfileActionHandler();
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
