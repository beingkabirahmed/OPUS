/**
 * ============================================================================
 * THE OPUS NETWORK — Main Application Controller
 * Handles mobile drawer, FAQ accordions, legal modals, and lifecycle initialization
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. Mobile Menu Drawer
  function initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener('click', closeDrawer);

    navLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // 2. FAQ Accordion Manager
  function initFAQ() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer) return;

    // Render FAQs from OPUS_DATA
    faqContainer.innerHTML = OPUS_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'open' : ''}">
        <button type="button" class="faq-question-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
          <span class="faq-question-title">${faq.question}</span>
          <span class="faq-icon-arrow">↓</span>
        </button>
        <div class="faq-answer-panel" style="${idx === 0 ? 'max-height: 300px;' : ''}">
          <p class="faq-answer-text">${faq.answer}</p>
        </div>
      </div>
    `).join('');

    const items = faqContainer.querySelectorAll('.faq-item');
    items.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items
        items.forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer-panel').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 30 + 'px';
        }
      });
    });
  }

  // 3. Legal Modals (Privacy Policy & Terms)
  function initLegalModals() {
    const privacyBtn = document.querySelectorAll('.js-open-privacy');
    const termsBtn = document.querySelectorAll('.js-open-terms');
    const legalModal = document.getElementById('legal-modal');
    const legalTitle = document.getElementById('legal-modal-title');
    const legalContent = document.getElementById('legal-modal-content');

    if (!legalModal || !legalTitle || !legalContent) return;

    const privacyText = `<p>${OPUS_DATA.legal.privacy}</p><p>Enquiries are handled through the linked Google Form. Review the notice and privacy terms shown on that form before submitting personal information.</p>`;

    const termsText = `<p>${OPUS_DATA.legal.terms}</p>`;

    function openLegal(title, content) {
      legalTitle.textContent = title;
      legalContent.innerHTML = content;
      legalModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    privacyBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openLegal('Privacy Policy', privacyText);
      });
    });

    termsBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openLegal('Terms & Rental Conditions', termsText);
      });
    });

    const closeBtn = legalModal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) {
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 4. Smooth Anchor Link Handler
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 5. Floating rider portal access. Replace this path when the separate portal is connected.
  function initRiderPortalAccess() {
    if (document.querySelector('.rider-portal-float')) return;
    const link = document.createElement('a');
    link.className = 'rider-portal-float';
    link.href = 'rider-portal/';
    link.setAttribute('aria-label', 'Rider login or register');
    link.innerHTML = '<span class="rider-portal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 8v6m3-3h-6"/></svg></span><span class="rider-portal-label">Rider Login <i>/</i> Register</span><span class="rider-portal-arrow" aria-hidden="true">↗</span>';
    document.body.append(link);
  }

  // Master Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initMobileDrawer();
    initFAQ();
    initLegalModals();
    initSmoothAnchors();
    initRiderPortalAccess();

    // Init subsystem modules
    if (window.OpusMotion) window.OpusMotion.init();
    if (window.OpusCatalog) window.OpusCatalog.init();
    if (window.OpusEcosystem) window.OpusEcosystem.init();
  });
})();
