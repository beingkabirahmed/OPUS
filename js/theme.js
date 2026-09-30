(function () {
  const key = 'opus-theme';
  let theme = 'light';
  try { theme = localStorage.getItem(key) === 'dark' ? 'dark' : 'light'; } catch (_) {}
  document.documentElement.dataset.theme = theme;

  function syncButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.setAttribute('title', `Switch to ${next} theme`);
      button.setAttribute('aria-pressed', document.documentElement.dataset.theme === 'light' ? 'true' : 'false');
      button.addEventListener('click', () => {
        const selected = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = selected;
        try { localStorage.setItem(key, selected); } catch (_) {}
        syncLabels();
      });
    });
    const menuButton = document.querySelector('[data-about-nav-toggle]');
    const menu = document.querySelector('.about-page .nav-menu');
    if (menuButton && menu) menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
  }
  function syncLabels() {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.setAttribute('title', `Switch to ${next} theme`);
      button.setAttribute('aria-pressed', document.documentElement.dataset.theme === 'light' ? 'true' : 'false');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncButtons, { once: true });
  else syncButtons();
})();
