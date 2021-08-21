'use strict';

// Constants
const MOD_NAV_OPEN = 'nav--open';
const MOD_NAV_HIGHLIGHT = 'nav--highlight';
const MOD_NAV_LINKS_OPAQUE = 'nav__links--opaque';

const NAV_TRANSITION_DURATION_MS = 300;

const NAV_MIN_OPACITY_UNTIL = 50;
const NAV_MAX_OPACITY_FROM = 50;
const NAV_BG_MAX_OPACITY = 0.9;

// Elements
const $ = document.querySelector.bind(document);
const $nav = $('nav');
const $navContainer = $('.nav__container');
const $navHamburgerBtn = $('.nav__hamburger');
const $navTitle = $('.nav__title');
const $navLinks = $('.nav__links');

// Event handlers
function isNavOpen() {
  return $nav.classList.contains(MOD_NAV_OPEN);
}

function toggleNav() {
  if (isNavOpen()) {
    closeNav();
  } else {
    $nav.classList.add(MOD_NAV_OPEN, MOD_NAV_HIGHLIGHT);
    $navLinks.classList.add(MOD_NAV_LINKS_OPAQUE);
  }
}
$navHamburgerBtn.addEventListener('click', toggleNav);

let isClosing = false;
function closeNav() {
  if (!isNavOpen() || isClosing) return;  // Not open or already closing
  isClosing = true;
  $nav.classList.remove(MOD_NAV_HIGHLIGHT);
  $navLinks.classList.remove(MOD_NAV_LINKS_OPAQUE);
  setTimeout(function () {
    $nav.classList.remove(MOD_NAV_OPEN);
    isClosing = false;
  }, NAV_TRANSITION_DURATION_MS);
}
document.body.addEventListener('click', closeNav);

$nav.addEventListener('click', function (e) {
  // Prevent clicking $nav from calling closeNav().
  e.stopPropagation()
});

function animationFrameStep() {
  const scrollRatio = Math.min(
      Math.max(window.scrollY - NAV_MIN_OPACITY_UNTIL, 0) / NAV_MAX_OPACITY_FROM,
      1);

  $navContainer.style.backgroundColor =
      `rgba(255,255,255,${NAV_BG_MAX_OPACITY * scrollRatio})`;
  $navTitle.style.opacity = scrollRatio;

  requestAnimationFrame(animationFrameStep);
}
requestAnimationFrame(animationFrameStep);
