/* eslint-disable no-undef, no-restricted-globals */

// Polyfill for process global variable
(function() {
  'use strict';
  
  // Define global if it doesn't exist
  if (typeof global === 'undefined') {
    window.global = window;
  }

  // Define process if it doesn't exist
  if (typeof process === 'undefined') {
    window.process = {
      env: {},
      version: '',
      versions: {},
      platform: 'browser',
      browser: true
    };
  }

  // Simple globalThis polyfill
  if (typeof globalThis === 'undefined') {
    window.globalThis = window;
  }
})();
