// Prevent browser from auto-restoring scroll position on reload/back
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Attach click handlers as soon as DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const selector = this.getAttribute('href');
      const target = selector && document.querySelector(selector);
      if (!target) return;

      // smooth scroll if supported, otherwise instant fallback
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const top = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo(0, top);
      }

      // optional: update URL hash without adding history entry
      history.replaceState(null, '', selector);
    });
  });
});

// Ensure we are at the very top after everything has loaded
window.addEventListener('load', () => {
  // force top after load (helps if browser jumps after DOMContentLoaded)
  window.scrollTo(0, 0);

  // remove any hash in the URL so future refreshes don't jump
  if (location.hash) {
    history.replaceState(null, '', location.pathname + location.search);
  }
});
