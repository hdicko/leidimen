/**
 * Utility functions for detecting and handling different types of media links
 */

/**
 * Check if URL is a valid YouTube link and extract video ID
 * @param {string} url - The URL to check
 * @returns {string|false} - Video ID if valid YouTube URL, false otherwise
 */
const isYoutubeLink = (url) => {
	const pattern =
		/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	const match = url.match(pattern);
	return match ? match[1] : false;
};

/**
 * Check if URL points to an image file
 * @param {string} url - The URL to check
 * @returns {boolean} - True if URL is an image, false otherwise
 */
const isImageLink = (url) => {
	const pattern = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif|webp))/i;
	return pattern.test(url);
};

/**
 * Check if URL is a Vimeo link and setup lightbox handler
 * @param {string} url - The Vimeo URL
 * @param {HTMLElement} el - The link element
 */
const isVimeoLink = async (url, el) => {
	try {
		const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);

		if (!response.ok) {
			console.error(`Vimeo API error: ${response.status}`);
			return;
		}

		const data = await response.json();
		const videoId = data.video_id;

		el.classList.add('lightbox-vimeo');
		el.setAttribute('data-id', videoId);

		el.addEventListener('click', (event) => {
			event.preventDefault();
			const lightbox = document.getElementById('lightbox');
			lightbox.innerHTML = `
				<a id="close"></a>
				<a id="next">&rsaquo;</a>
				<a id="prev">&lsaquo;</a>
				<div class="videoWrapperContainer">
					<div class="videoWrapper">
						<iframe 
							src="https://player.vimeo.com/video/${el.getAttribute('data-id')}/?autoplay=1&byline=0&title=0&portrait=0" 
							webkitallowfullscreen 
							mozallowfullscreen 
							allowfullscreen>
						</iframe>
					</div>
				</div>
			`;
			lightbox.style.display = 'block';
			setGallery(el);
		});
	} catch (error) {
		console.error('Error fetching Vimeo data:', error);
	}
};

/**
 * Set up gallery navigation for the current lightbox element
 * @param {HTMLElement} el - The clicked element
 */
const setGallery = (el) => {
	// Remove gallery class from all elements
	document.querySelectorAll('.gallery').forEach((element) => {
		element.classList.remove('gallery');
	});

	const parentContainer = el.closest('ul, p');
	if (!parentContainer) return;

	const linkElements = Array.from(parentContainer.querySelectorAll("a[class*='lightbox-']"));

	// Reset current class on all links
	linkElements.forEach((link) => link.classList.remove('current'));

	// Set current link
	const currentLink = linkElements.find((link) => link.getAttribute('href') === el.getAttribute('href'));
	if (currentLink) {
		currentLink.classList.add('current');
	}

	// Enable gallery mode if there are multiple items
	if (linkElements.length > 1) {
		const lightbox = document.getElementById('lightbox');
		lightbox.classList.add('gallery');
		linkElements.forEach((link) => link.classList.add('gallery'));

		// Setup navigation
		const galleryElements = document.querySelectorAll('a.gallery');
		const currentIndex = Array.from(galleryElements).findIndex((item) => item.classList.contains('current'));

		if (currentIndex === -1) return;

		const nextIndex = (currentIndex + 1) % galleryElements.length;
		const prevIndex = (currentIndex - 1 + galleryElements.length) % galleryElements.length;

		const nextButton = document.getElementById('next');
		const prevButton = document.getElementById('prev');

		if (nextButton && prevButton) {
			nextButton.addEventListener('click', () => galleryElements[nextIndex].click());
			prevButton.addEventListener('click', () => galleryElements[prevIndex].click());
		}
	}
};

/**
 * Initialize lightbox functionality on DOM load
 */
document.addEventListener('DOMContentLoaded', () => {
	// Create lightbox container
	const lightboxDiv = document.createElement('div');
	lightboxDiv.setAttribute('id', 'lightbox');
	document.body.appendChild(lightboxDiv);

	// Process all links and add appropriate lightbox classes
	const links = document.querySelectorAll('a');
	links.forEach((link) => {
		const url = link.getAttribute('href');
		if (!url || link.classList.contains('no-lightbox')) return;

		// Check for Vimeo links
		if (url.includes('vimeo')) {
			isVimeoLink(url, link);
		}

		// Check for YouTube links
		const youtubeId = isYoutubeLink(url);
		if (youtubeId) {
			link.classList.add('lightbox-youtube');
			link.setAttribute('data-id', youtubeId);
		}

		// Check for image links
		if (isImageLink(url)) {
			link.classList.add('lightbox-image');
			const filename = url.split('/').pop();
			const name = filename.split('.')[0];
			link.setAttribute('title', name);
		}
	});

	// Close lightbox on background click
	lightboxDiv.addEventListener('click', (event) => {
		if (event.target.id !== 'next' && event.target.id !== 'prev') {
			lightboxDiv.innerHTML = '';
			lightboxDiv.style.display = 'none';
		}
	});

	// Setup YouTube lightbox handlers
	const youtubeLinks = document.querySelectorAll('a.lightbox-youtube');
	youtubeLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const videoId = link.getAttribute('data-id');
			lightboxDiv.innerHTML = `
				<a id="close"></a>
				<a id="next">&rsaquo;</a>
				<a id="prev">&lsaquo;</a>
				<div class="videoWrapperContainer">
					<div class="videoWrapper">
						<iframe 
							src="https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&rel=0"
							allowfullscreen>
						</iframe>
					</div>
				</div>
			`;
			lightboxDiv.style.display = 'block';
			setGallery(link);
		});
	});

	// Setup image lightbox handlers
	const imageLinks = document.querySelectorAll('a.lightbox-image');
	imageLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const href = link.getAttribute('href');
			const title = link.getAttribute('title') || '';

			lightboxDiv.innerHTML = `
				<a id="close"></a>
				<a id="next">&rsaquo;</a>
				<a id="prev">&lsaquo;</a>
				<div class="img" title="${title}">
					<img class="lightbox-img" src="${href}" alt="${title}" />
				</div>
				<span>${title}</span>
			`;
			lightboxDiv.style.display = 'block';
			setGallery(link);
		});
	});
});
