/* About page: live user-input cost estimates and an interactive geographic service map. */
(function () {
  'use strict';

  function initCostCalculator() {
    const root = document.querySelector('[data-two-wheeler-calculator]');
    if (!root) return;
    const growth = root.querySelector('#twc-growth');
    const currency = new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 2
    });
    const growthOutput = root.querySelector('#twc-growth-output');
    const scoreValue = root.querySelector('#twc-score-value');
    const chargeValue = root.querySelector('#twc-charge-value');
    const swapValue = root.querySelector('#twc-swap-value');
    const chargeBar = root.querySelector('#twc-charge-bar');
    const swapBar = root.querySelector('#twc-swap-bar');
    const chart = root.querySelector('#twc-chart');
    const chartGrowth = root.querySelector('#twc-growth-chart-label');
    function update() {
      const effort = Number(growth.value);
      const effortScale = effort / 200;
      const chargingEstimate = 200 * effortScale + 1600 * effortScale * effortScale;
      const swapMultiplier = effort <= 75
        ? 1.10
        : 1.10 + ((effort - 75) / 125) * ((2750 / 1800) - 1.10);
      const swappingEstimate = chargingEstimate * swapMultiplier;
      const maxEstimate = 2750;
      growthOutput.value = `${effort}%`;
      growthOutput.textContent = `${effort}%`;
      scoreValue.textContent = `${effort}%`;
      chargeValue.textContent = currency.format(chargingEstimate);
      swapValue.textContent = currency.format(swappingEstimate);
      chargeBar.style.height = `${chargingEstimate / maxEstimate * 80}%`;
      swapBar.style.height = `${swappingEstimate / maxEstimate * 80}%`;
      chartGrowth.textContent = `${effort}% effort`;
      chart.setAttribute('aria-label', `Illustrative comparison at ${effort}% effort: Charging ${currency.format(chargingEstimate)}, Swapping ${currency.format(swappingEstimate)}.`);
      const progress = effort / Number(growth.max) * 100;
      growth.style.setProperty('--twc-progress', `${progress}%`);
    }
    growth.addEventListener('input', update);
    growth.addEventListener('change', update);
    update();
  }

  function initNetworkMap() {
    const map = document.querySelector('[data-network-map]');
    if (!map) return;
    function replay() {
      map.classList.remove('is-visible');
      void map.offsetWidth;
      map.classList.add('is-visible');
    }
    const replayButton = map.querySelector('[data-map-replay]');
    if (replayButton) replayButton.addEventListener('click', replay);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        replay();
        observer.disconnect();
      }, { threshold: 0.28 });
      observer.observe(map);
    } else {
      replay();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCostCalculator();
    initNetworkMap();
  });
})();
