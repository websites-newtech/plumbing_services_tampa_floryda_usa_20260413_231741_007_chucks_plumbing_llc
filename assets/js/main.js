/* =============================================================================
   CHUCK'S PLUMBING LLC — MAIN JAVASCRIPT
   ============================================================================= */

'use strict';

// ── Year update ──────────────────────────────────────────────────────────────
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Navbar scroll effect ─────────────────────────────────────────────────────
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile menu ──────────────────────────────────────────────────────────────
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (isOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
})();

// ── Scroll-triggered animations ───────────────────────────────────────────────
(function initScrollAnimations() {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Make everything visible immediately
    document.querySelectorAll('[data-animate]').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('[data-animate]').forEach(function(el) {
    observer.observe(el);
  });
})();

// ── Contact form ──────────────────────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('form-submit');
  const successMsg = document.getElementById('form-success');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function clearAllErrors() {
    ['fullName', 'email', 'message'].forEach(clearError);
  }

  // Real-time validation clearing
  ['fullName', 'email', 'message'].forEach(function(id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', function() {
        clearError(id);
      });
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    if (!fullName || fullName.value.trim().length < 2) {
      showError('fullName', 'Please enter your full name.');
      isValid = false;
    }

    if (!email || !validateEmail(email.value.trim())) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message || message.value.trim().length < 10) {
      showError('message', 'Please describe your issue (at least 10 characters).');
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (btnSpinner) btnSpinner.style.display = 'block';

    // Simulate async submission (replace with actual endpoint)
    setTimeout(function() {
      // Reset button
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
      if (btnSpinner) btnSpinner.style.display = 'none';

      // Show success
      if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form
      form.reset();
    }, 1400);
  });
})();

// ── Smooth anchor scrolling for in-page links ─────────────────────────────────
(function initSmoothAnchors() {
  document.querySelectorAll('a[href*="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.substring(hashIndex + 1);
      const samePage = href.substring(0, hashIndex) === '' ||
        href.substring(0, hashIndex) === window.location.pathname.split('/').pop();

      if (samePage && hash) {
        const target = document.getElementById(hash);
        if (target) {
          e.preventDefault();
          const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 24;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
})();