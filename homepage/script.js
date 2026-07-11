// Sticky header compact state
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 12) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Products dropdown: tap-to-toggle on touch devices, hover handled in CSS
const productsDropdown = document.getElementById('productsDropdown');
const dropdownToggle = productsDropdown.querySelector('.dropdown-toggle');
dropdownToggle.addEventListener('click', (e) => {
  if (window.matchMedia('(hover: hover)').matches) return; // desktop uses hover
  e.preventDefault();
  const isOpen = productsDropdown.classList.toggle('open');
  dropdownToggle.setAttribute('aria-expanded', isOpen);
});
document.addEventListener('click', (e) => {
  if (!productsDropdown.contains(e.target)) {
    productsDropdown.classList.remove('open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }
});

// Search box expand/collapse
const searchWrap = document.getElementById('searchWrap');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
searchBtn.addEventListener('click', () => {
  const isOpen = searchWrap.classList.toggle('active');
  if (isOpen) searchInput.focus();
});
document.addEventListener('click', (e) => {
  if (!searchWrap.contains(e.target)) searchWrap.classList.remove('active');
});

// Mobile full-screen menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

const openMobileMenu = () => {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburgerBtn.classList.add('active');
  document.body.style.overflow = 'hidden';
};
const closeMobileMenu = () => {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  document.body.style.overflow = '';
};

hamburgerBtn.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Mobile products accordion
document.querySelectorAll('.mobile-accordion-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

// Floor tabs (Explore Our 4 Floors)
const floorTabs = document.getElementById('floorTabs');
if (floorTabs) {
  const tabs = floorTabs.querySelectorAll('.floor-tab');
  const panels = document.querySelectorAll('.floor-panel');
  floorTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.floor-tab');
    if (!tab) return;
    const floor = tab.dataset.floor;
    tabs.forEach((t) => t.classList.toggle('active', t === tab));
    panels.forEach((p) => p.classList.toggle('active', p.dataset.floor === floor));
  });
}

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
