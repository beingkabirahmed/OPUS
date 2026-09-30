/**
 * ============================================================================
 * THE OPUS NETWORK — Vehicle Catalogue & Modal Specification Viewer
 * ============================================================================
 */

(function () {
  'use strict';

  function renderVehicleCards() {
    const grid = document.getElementById('vehicles-grid');
    if (!grid) return;

    const vehicles = OPUS_DATA.vehicles;

    grid.innerHTML = vehicles.map(v => `
      <article class="vehicle-card reveal-fade-up" data-vehicle-id="${v.id}">
        <div class="vehicle-card-image-box">
          <span class="vehicle-card-badge">${v.speedCategory}</span>
          <img src="${v.primaryImage}" alt="${v.name} electric vehicle rental" class="vehicle-thumb-img" loading="lazy">
        </div>
        <div class="vehicle-card-body">
          <h3 class="vehicle-title">${v.name}</h3>
          <p class="vehicle-brief">${v.description}</p>
          
          <div class="vehicle-spec-pills">
            <div class="spec-pill">
              <span class="spec-pill-label">Stated top speed</span>
              <span class="spec-pill-val">${v.topSpeed}</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Average range</span>
              <span class="spec-pill-val">${v.range}</span>
            </div>
          </div>

          <div class="vehicle-card-actions">
            <button type="button" class="btn btn-secondary btn-sm js-view-details" data-id="${v.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              View Details
            </button>
            <button type="button" class="btn btn-primary btn-sm js-enquire-model" data-id="${v.id}" data-name="${v.name}">
              Enquire
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Trigger reveal class for dynamically rendered cards
    setTimeout(() => {
      grid.querySelectorAll('.reveal-fade-up').forEach(el => el.classList.add('is-revealed'));
    }, 50);

    initVehicleCarousel();
    attachCardListeners();
  }

  function initVehicleCarousel() {
    const track = document.getElementById('vehicles-grid');
    const dots = document.getElementById('vehicle-gallery-dots');
    const status = document.getElementById('vehicle-gallery-status');
    if (!track || !dots) return;
    const cards = [...track.querySelectorAll('.vehicle-card')];
    dots.innerHTML = cards.map((v, i) => `<button type="button" class="gallery-dot${i === 0 ? ' active' : ''}" aria-label="Show ${v.querySelector('.vehicle-title').textContent}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`).join('');
    const dotButtons = [...dots.querySelectorAll('.gallery-dot')];
    const setActive = (index) => {
      const nearest = Math.max(0, Math.min(cards.length - 1, index));
      dotButtons.forEach((dot, i) => {
        dot.classList.toggle('active', i === nearest);
        dot.setAttribute('aria-current', i === nearest ? 'true' : 'false');
      });
      if (status) status.textContent = `Model ${nearest + 1} of ${cards.length}`;
    };
    const show = (index) => cards[Math.max(0, Math.min(cards.length - 1, index))]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    dotButtons.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    document.getElementById('vehicle-previous')?.addEventListener('click', () => show(Math.max(0, dotButtons.findIndex(d => d.classList.contains('active')) - 1)));
    document.getElementById('vehicle-next')?.addEventListener('click', () => show(Math.min(cards.length - 1, dotButtons.findIndex(d => d.classList.contains('active')) + 1)));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(cards.indexOf(visible.target));
    }, { root: track, threshold: [0.45, 0.65, 0.85] });
    cards.forEach(card => observer.observe(card));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') show(Math.min(cards.length - 1, dotButtons.findIndex(d => d.classList.contains('active')) + 1));
      if (e.key === 'ArrowLeft') show(Math.max(0, dotButtons.findIndex(d => d.classList.contains('active')) - 1));
    });

    // Native touch scrolling remains in control on phones; add mouse dragging for desktop.
    let dragStartX = 0;
    let dragScrollStart = 0;
    let dragged = false;
    track.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button,a,input,select,textarea')) return;
      dragStartX = event.clientX;
      dragScrollStart = track.scrollLeft;
      dragged = false;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    });
    track.addEventListener('pointermove', event => {
      if (!track.hasPointerCapture(event.pointerId)) return;
      const delta = event.clientX - dragStartX;
      if (Math.abs(delta) > 5) dragged = true;
      if (dragged) {
        event.preventDefault();
        track.scrollLeft = dragScrollStart - delta;
      }
    });
    const stopDrag = event => {
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      track.classList.remove('is-dragging');
    };
    track.addEventListener('pointerup', stopDrag);
    track.addEventListener('pointercancel', stopDrag);
    track.addEventListener('click', event => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    }, true);
  }

  function attachCardListeners() {
    // Detail buttons
    document.querySelectorAll('.js-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        openVehicleModal(id);
      });
    });

    // Enquire shortcuts
    document.querySelectorAll('.js-enquire-model').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modelName = e.currentTarget.getAttribute('data-name');
        quickEnquire(modelName);
      });
    });
  }

  function openVehicleModal(vehicleId) {
    const v = OPUS_DATA.vehicles.find(item => item.id === vehicleId);
    if (!v) return;

    const modal = document.getElementById('vehicle-modal');
    const container = document.getElementById('vehicle-modal-content');
    if (!modal || !container) return;

    const specRows = Object.entries(v.specs).map(([key, val]) => `
      <tr>
        <td>${key}</td>
        <td>${val}</td>
      </tr>
    `).join('');

    const thumbsHtml = v.gallery.length > 1 ? `
      <div class="modal-thumbs-row">
        ${v.gallery.map((imgSrc, idx) => `
          <button type="button" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-full="${imgSrc}" aria-label="Thumbnail view ${idx + 1}">
            <img src="${imgSrc}" alt="${v.name} thumbnail">
          </button>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <div class="vehicle-modal-grid">
        <div class="modal-gallery-box">
          <div class="modal-main-img-wrap">
            <img id="modal-main-img" src="${v.primaryImage}" alt="${v.name}" class="modal-main-img">
          </div>
          ${thumbsHtml}
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-primary); margin-top: 8px;">
            ${v.availabilityStatus}
          </div>
        </div>

        <div class="modal-details-box">
          <div class="section-badge" style="margin-bottom: 8px;">
            <span class="section-badge-dot"></span>
            ${v.speedCategory}
          </div>
          <h2 class="modal-vehicle-title">${v.name}</h2>
          <p class="modal-vehicle-description">
            ${v.description}
          </p>

          <table class="modal-spec-table">
            <tbody>
              ${specRows}
            </tbody>
          </table>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" id="modal-enquire-btn" data-name="${v.name}">
              Enquire for this Vehicle
            </button>
            <button type="button" class="btn btn-secondary js-modal-close">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    // Thumbnail click logic
    const thumbBtns = container.querySelectorAll('.modal-thumb');
    const mainImg = container.querySelector('#modal-main-img');
    thumbBtns.forEach(tBtn => {
      tBtn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        tBtn.classList.add('active');
        mainImg.src = tBtn.getAttribute('data-full');
      });
    });

    // Enquire button in modal
    const modalEnquire = container.querySelector('#modal-enquire-btn');
    if (modalEnquire) {
      modalEnquire.addEventListener('click', () => {
        closeModal(modal);
        quickEnquire(v.name);
      });
    }

    // Close buttons in modal
    container.querySelectorAll('.js-modal-close').forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function quickEnquire(modelName) {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (OPUS_DATA.contact?.enquiryUrl) window.open(OPUS_DATA.contact.enquiryUrl, '_blank', 'noopener,noreferrer');
  }

  function initCatalog() {
    renderVehicleCards();

    // Modal background click and close button
    const modal = document.getElementById('vehicle-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  }

  window.OpusCatalog = {
    init: initCatalog,
    openModal: openVehicleModal
  };
})();
