'use strict';

// Constants
const MOD_NAV_OPEN = 'nav--open';

// Elements
const $ = document.querySelector.bind(document);
const $nav = $('nav');

// Event handlers
function toggleNav() {
  $nav.className = $nav.className ? '' : MOD_NAV_OPEN;
}
