// Navbar: scroll shadow effect + mobile menu auto-close

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarNav');
  if (!navbarToggler || !navbarCollapse) return;

  document
    .querySelectorAll('.navbar-nav .nav-link, .dropdown-item')
    .forEach((link) => {
      link.addEventListener('click', () => {
        if (
          window.innerWidth < 992 &&
          navbarCollapse.classList.contains('show')
        ) {
          navbarToggler.click();
        }
      });
    });
});
