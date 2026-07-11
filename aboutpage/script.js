// Header scroll shadow
const siteHeader = document.getElementById('siteHeader');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Search box toggle
const searchWrap = document.getElementById('searchWrap');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
if (searchWrap && searchBtn) {
  searchBtn.addEventListener('click', () => {
    searchWrap.classList.toggle('active');
    if (searchWrap.classList.contains('active')) searchInput.focus();
  });
}

// Products mega-menu toggle (touch / keyboard)
const productsDropdown = document.getElementById('productsDropdown');
if (productsDropdown) {
  const toggle = productsDropdown.querySelector('.dropdown-toggle');
  toggle.addEventListener('click', () => {
    productsDropdown.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!productsDropdown.contains(e.target)) productsDropdown.classList.remove('open');
  });
}

// Mobile menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburgerBtn.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  document.body.style.overflow = '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });
}
if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

// Mobile accordion (Products)
document.querySelectorAll('.mobile-accordion-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.mobile-accordion').classList.toggle('open');
  });
});

// Scroll-reveal animation with a light stagger per group
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const groups = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const parent = el.parentElement;
      const siblingIndex = groups.get(parent) || 0;
      el.style.transitionDelay = `${Math.min(siblingIndex, 6) * 70}ms`;
      groups.set(parent, siblingIndex + 1);
      el.classList.add('in-view');
      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in-view'));
}
