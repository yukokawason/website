'use strict';

// Constants
const MOD_NAV_OPEN = 'nav--open';

const NAV_MIN_OPACITY_UNTIL = 50;
const NAV_MAX_OPACITY_FROM = 50;
const NAV_BG_MAX_OPACITY = 0.9;

// Elements
const $ = document.querySelector.bind(document);
const $nav = $('nav');
const $navContainer = $('.nav__container');
const $navTitle = $('.nav__title');

// Event handlers
function toggleNav() {
  $nav.className = $nav.className ? '' : MOD_NAV_OPEN;
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
