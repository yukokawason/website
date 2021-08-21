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
const $navTitle = $('.nav__title');
const $navLinks = $('.nav__links');

// Event handlers
let isClosing = false;
function toggleNav() {
  const isOpen = $nav.classList.contains(MOD_NAV_OPEN);
  if (isOpen) {
    if (isClosing) return;  // Already closing
    isClosing = true;
    $nav.classList.remove(MOD_NAV_HIGHLIGHT);
    $navLinks.classList.remove(MOD_NAV_LINKS_OPAQUE);
    setTimeout(function () {
      $nav.classList.remove(MOD_NAV_OPEN);
      isClosing = false;
    }, NAV_TRANSITION_DURATION_MS);
  } else {
    $nav.classList.add(MOD_NAV_OPEN, MOD_NAV_HIGHLIGHT);
    $navLinks.classList.add(MOD_NAV_LINKS_OPAQUE);
  }
}

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
