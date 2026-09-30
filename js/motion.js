/**
 * ============================================================================
 * THE OPUS NETWORK — Motion, Scroll Reveals & Animated Counters
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. Intersection Observer for Scroll Reveals
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-scale-up');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      reveals.forEach(el => el.classList.add('is-revealed'));
    }
  }

  // 2. Animated Numerical Counters with Easing
  function initStatCounters() {
    const statElements = document.querySelectorAll('[data-counter-target]');
    if (!statElements.length) return;

    let hasCounted = false;

    function countUp(el, target, duration = 1800) {
      const start = 0;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease Out Quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(start + (target - start) * easeProgress);

        el.textContent = currentVal.toLocaleString('en-IN');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString('en-IN');
        }
      }

      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const statsSection = document.querySelector('#metrics');
      if (statsSection) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
              hasCounted = true;
              statElements.forEach(el => {
                const target = parseInt(el.getAttribute('data-counter-target'), 10);
                if (!isNaN(target)) {
                  countUp(el, target);
                }
              });
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });

        observer.observe(statsSection);
      }
    } else {
      statElements.forEach(el => {
        el.textContent = el.getAttribute('data-counter-target');
      });
    }
  }

  // 3. Header Scroll State Spy
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 4. Section Scroll Spy for Nav Links
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // Export functions to global scope
  window.OpusMotion = {
    init: function () {
      initScrollReveals();
      initStatCounters();
      initHeaderScroll();
      initScrollSpy();
    }
  };
})();
