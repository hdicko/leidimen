// Footer: section entrance animations, smooth scroll anchors, back-to-top button

document.addEventListener('DOMContentLoaded', function () {
  // Animate footer sections on scroll into view
  const footerSections = document.querySelectorAll('.footer-section');
  if (footerSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    footerSections.forEach((section) => observer.observe(section));
  }

  // Smooth scroll for footer anchor links
  document.querySelectorAll('.footer-links a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Back-to-top button visibility
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    Object.assign(backToTop.style, {
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s ease',
    });
    window.addEventListener('scroll', function () {
      const visible = window.pageYOffset > 300;
      backToTop.style.opacity = visible ? '1' : '0';
      backToTop.style.visibility = visible ? 'visible' : 'hidden';
    });
  }
});
