/**
 * ============================================================================
 * THE OPUS NETWORK — Interactive Battery Ecosystem Visualizer
 * ============================================================================
 */

(function () {
  'use strict';

  function renderProviderCards() {
    const container = document.getElementById('ecosystem-cards-grid');
    if (!container) return;

    container.innerHTML = OPUS_DATA.batteryProviders.map((p, idx) => `
      <div class="provider-info-card ${idx === 0 ? 'selected' : ''}" data-provider-id="${p.id}" tabindex="0" role="button" aria-pressed="${idx === 0 ? 'true' : 'false'}" aria-label="View details for ${p.name}">
        <div class="provider-card-name">${p.name}</div>
        <div class="provider-card-relation">${p.relationship}</div>
        <p class="provider-card-desc">${p.description}</p>
        <div class="provider-card-tag">
          <strong>Compatible:</strong> ${p.compatibleModels.join(', ')}
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    const cards = container.querySelectorAll('.provider-info-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        selectProvider(card.getAttribute('data-provider-id'));
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectProvider(card.getAttribute('data-provider-id'));
        }
      });
    });
  }

  function selectProvider(providerId) {
    // Highlight provider card
    const cards = document.querySelectorAll('.provider-info-card');
    cards.forEach(c => {
      if (c.getAttribute('data-provider-id') === providerId) {
        c.classList.add('selected');
        c.setAttribute('aria-pressed', 'true');
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      }
    });

    // Highlight visual nodes
    const nodes = document.querySelectorAll('.provider-node');
    nodes.forEach(n => {
      if (n.getAttribute('data-node-id') === providerId) {
        n.classList.add('active');
      } else {
        n.classList.remove('active');
      }
    });

    // Highlight connecting SVG ray
    const rays = document.querySelectorAll('.energy-ray-line');
    rays.forEach(r => {
      if (r.getAttribute('data-target-id') === providerId) {
        r.setAttribute('stroke', '#FACC15');
        r.setAttribute('stroke-width', '3');
      } else {
        r.setAttribute('stroke', 'rgba(249, 115, 22, 0.4)');
        r.setAttribute('stroke-width', '1.5');
      }
    });
  }

  function initEcosystemNodes() {
    const nodes = document.querySelectorAll('.provider-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-node-id');
        selectProvider(id);
      });
    });
  }

  function initEcosystem() {
    renderProviderCards();
    initEcosystemNodes();
    // Default select first provider
    selectProvider('indofast');
  }

  window.OpusEcosystem = {
    init: initEcosystem,
    select: selectProvider
  };
})();
