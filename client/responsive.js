// responsive.js – handles mobile sidebar drawer and resize debounce

// Toggle sidebar visibility on mobile (≤640px)
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
}

// Add hamburger button if not present
function injectHamburger() {
  const headerRight = document.querySelector('.header-right');
  if (!headerRight) return;
  const btn = document.createElement('button');
  btn.className = 'icon-btn hamburger';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = `<svg width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
  btn.addEventListener('click', toggleSidebar);
  headerRight.prepend(btn);
}

// Debounce helper for resize events
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

function handleResize() {
  const width = window.innerWidth;
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  if (width > 640) {
    sidebar.classList.remove('open');
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  injectHamburger();
  window.addEventListener('resize', debounce(handleResize, 200));
});
