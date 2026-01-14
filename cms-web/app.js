// Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const REPO_OWNER = 'hdicko';
const REPO_NAME = 'leidimen';

// State
let currentView = 'create-post';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
	initializeDateField();
	setupEventListeners();
	setupCharacterCounter();
	loadStats();
});

// Initialize date field with today's date
function initializeDateField() {
	const today = new Date().toISOString().split('T')[0];
	document.getElementById('postDate').value = today;
}

// Setup event listeners
function setupEventListeners() {
	// Navigation
	document.querySelectorAll('[data-view]').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			switchView(e.target.closest('[data-view]').dataset.view);
		});
	});

	// Form submission
	document.getElementById('createPostForm').addEventListener('submit', handleFormSubmit);

	// Preview button
	document.getElementById('previewBtn').addEventListener('click', showPreview);

	// Description counter
	document.getElementById('postDescription').addEventListener('input', updateCharacterCount);
}

// Character counter for description
function setupCharacterCounter() {
	updateCharacterCount();
}

function updateCharacterCount() {
	const desc = document.getElementById('postDescription');
	const counter = document.getElementById('descLength');
	const length = desc.value.length;

	counter.textContent = length;

	if (length > 160) {
		counter.style.color = 'var(--danger-color)';
	} else if (length >= 150) {
		counter.style.color = 'var(--warning-color)';
	} else {
		counter.style.color = 'var(--info-color)';
	}
}

// Switch between views
function switchView(viewName) {
	// Hide all views
	document.querySelectorAll('.content-view').forEach((view) => {
		view.classList.add('d-none');
	});

	// Show selected view
	document.getElementById(`view-${viewName}`).classList.remove('d-none');

	// Update active nav item
	document.querySelectorAll('[data-view]').forEach((link) => {
		link.classList.remove('active');
	});
	document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

	currentView = viewName;

	// Load data if needed
	if (viewName === 'list-posts') {
		loadPosts();
	}
}

// Generate slug from title
function generateSlug(title) {
	return title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// Preview post
function showPreview() {
	const formData = getFormData();
	const content = generateMarkdownContent(formData);

	document.getElementById('previewContent').textContent = content;
	document.getElementById('previewSection').classList.remove('d-none');

	// Scroll to preview
	document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

// Get form data
function getFormData() {
	const villages = Array.from(document.getElementById('postVillage').selectedOptions).map((opt) => opt.value);

	const tags = document
		.getElementById('postTags')
		.value.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => tag);

	return {
		title: document.getElementById('postTitle').value,
		date: document.getElementById('postDate').value,
		villages: villages,
		category: document.getElementById('postCategory').value,
		mood: document.getElementById('postMood').value,
		tags: tags,
		description: document.getElementById('postDescription').value,
		image: document.getElementById('postImage').value,
		content: document.getElementById('postContent').value,
		draft: document.getElementById('postDraft').checked,
	};
}

// Generate markdown content
function generateMarkdownContent(data) {
	const villagesStr = data.villages.map((v) => `"${v}"`).join(', ');
	const tagsStr = data.tags.map((t) => `"${t}"`).join(', ');

	return `---
title: "${data.title}"
date: ${data.date}
villages: [${villagesStr}]
categories: ["${data.category}"]
tags: [${tagsStr}]
moods: ["${data.mood}"]
description: "${data.description}"
image: "${data.image}"
draft: ${data.draft}
---

${data.content}
`;
}

// Handle form submission
async function handleFormSubmit(e) {
	e.preventDefault();

	const submitBtn = document.getElementById('submitBtn');
	const originalText = submitBtn.innerHTML;

	// Show loading state
	submitBtn.disabled = true;
	submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Création en cours...';

	try {
		const formData = getFormData();
		const slug = generateSlug(formData.title);
		const year = new Date(formData.date).getFullYear();
		const filePath = `content/posts/${year}/${slug}.md`;
		const content = generateMarkdownContent(formData);

		// Send to backend API
		const response = await fetch(`${API_BASE_URL}/create-post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				path: filePath,
				content: content,
				message: `feat: Add post - ${formData.title}`,
				branch: 'main',
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		// Show success message
		showToast('success', `Post "${formData.title}" créé et publié avec succès !`);

		// Reset form
		document.getElementById('createPostForm').reset();
		initializeDateField();
		document.getElementById('previewSection').classList.add('d-none');

		// Update stats
		loadStats();
	} catch (error) {
		console.error('Error:', error);
		showToast('error', `Erreur lors de la création du post: ${error.message}`);
	} finally {
		// Restore button state
		submitBtn.disabled = false;
		submitBtn.innerHTML = originalText;
	}
}

// Show toast notification
function showToast(type, message) {
	const toastId = type === 'success' ? 'successToast' : 'errorToast';
	const messageId = type === 'success' ? 'successMessage' : 'errorMessage';

	document.getElementById(messageId).textContent = message;

	const toastElement = document.getElementById(toastId);
	const toast = new bootstrap.Toast(toastElement);
	toast.show();
}

// Load statistics
async function loadStats() {
	try {
		const response = await fetch(`${API_BASE_URL}/stats`);
		if (response.ok) {
			const stats = await response.json();
			document.getElementById('stats-posts').textContent = stats.posts || '-';
			document.getElementById('stats-members').textContent = stats.members || '-';
		}
	} catch (error) {
		console.error('Error loading stats:', error);
	}
}

// Load posts list
async function loadPosts() {
	const postsList = document.getElementById('postsList');
	postsList.innerHTML =
		'<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Chargement...</span></div></div>';

	try {
		const response = await fetch(`${API_BASE_URL}/posts`);
		if (!response.ok) {
			throw new Error('Failed to load posts');
		}

		const posts = await response.json();

		if (posts.length === 0) {
			postsList.innerHTML = '<div class="alert alert-info">Aucun post trouvé.</div>';
			return;
		}

		let html = '';
		posts.forEach((post) => {
			html += `
                <div class="post-item">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="mb-1">${post.title}</h5>
                            <p class="text-muted mb-2">${post.description || 'Pas de description'}</p>
                            <div>
                                ${post.villages ? post.villages.map((v) => `<span class="badge bg-primary me-1">${v}</span>`).join('') : ''}
                                ${post.category ? `<span class="badge bg-success">${post.category}</span>` : ''}
                                ${post.mood ? `<span class="badge bg-info">${post.mood}</span>` : ''}
                            </div>
                        </div>
                        <div class="text-end">
                            <small class="text-muted">${post.date}</small>
                        </div>
                    </div>
                </div>
            `;
		});

		postsList.innerHTML = html;
	} catch (error) {
		console.error('Error loading posts:', error);
		postsList.innerHTML = '<div class="alert alert-danger">Erreur lors du chargement des posts.</div>';
	}
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		generateSlug,
		generateMarkdownContent,
		getFormData,
	};
}
