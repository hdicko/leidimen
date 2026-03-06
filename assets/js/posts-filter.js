// Posts listing: search by title, filter by year, sort, reset

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchTitle');
  const yearFilter = document.getElementById('filterYear');
  const sortSelect = document.getElementById('sortPosts');
  const resetBtn = document.getElementById('resetFilters');
  const postsGrid = document.getElementById('postsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');
  const postCards = Array.from(document.querySelectorAll('.post-card-ctx7'));

  if (!searchInput || !postsGrid) return;

  function filterAndSortPosts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedYear = yearFilter.value;
    const sortBy = sortSelect.value;

    let visiblePosts = postCards.filter((card) => {
      const matchesSearch =
        !searchTerm || card.dataset.title.includes(searchTerm);
      const matchesYear = !selectedYear || card.dataset.year === selectedYear;
      const isVisible = matchesSearch && matchesYear;
      card.style.display = isVisible ? 'block' : 'none';
      return isVisible;
    });

    visiblePosts.sort((a, b) => {
      if (sortBy === 'date-desc')
        return b.dataset.date.localeCompare(a.dataset.date);
      if (sortBy === 'date-asc')
        return a.dataset.date.localeCompare(b.dataset.date);
      if (sortBy === 'title')
        return a.dataset.title.localeCompare(b.dataset.title);
      return 0;
    });

    visiblePosts.forEach((card) => postsGrid.appendChild(card));

    const total = postCards.length;
    const visible = visiblePosts.length;
    resultsCount.textContent =
      visible === total
        ? `${total} article${total > 1 ? 's' : ''} au total`
        : `${visible} article${visible > 1 ? 's' : ''} sur ${total}`;

    postsGrid.style.display = visible === 0 ? 'none' : 'grid';
    noResults.classList.toggle('d-none', visible > 0);
  }

  function resetFilters() {
    searchInput.value = '';
    yearFilter.value = '';
    sortSelect.value = 'date-desc';
    filterAndSortPosts();
  }

  searchInput.addEventListener('input', filterAndSortPosts);
  yearFilter.addEventListener('change', filterAndSortPosts);
  sortSelect.addEventListener('change', filterAndSortPosts);
  resetBtn.addEventListener('click', resetFilters);

  filterAndSortPosts();
});
