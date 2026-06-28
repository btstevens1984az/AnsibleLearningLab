(function () {
  'use strict';

  const STORAGE_KEY = 'ansible-lab-progress';
  const tabs = document.querySelectorAll('.tab-nav button[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');
  const searchInput = document.getElementById('tab-search');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');

  let visited = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  function activateTab(tabId) {
    tabs.forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    if (!visited.includes(tabId)) {
      visited.push(tabId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    }

    updateProgress();
    history.replaceState(null, '', `#${tabId}`);
  }

  function updateProgress() {
    const total = tabs.length;
    const count = visited.length;
    const pct = Math.round((count / total) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressLabel) progressLabel.textContent = `${count}/${total} sections visited (${pct}%)`;
  }

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  const hash = window.location.hash.slice(1);
  const validTab = hash && document.getElementById(hash);
  activateTab(validTab ? hash : 'overview');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      tabs.forEach((btn) => {
        const li = btn.closest('li');
        const text = btn.textContent.toLowerCase();
        li.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pre = btn.closest('.code-block')?.querySelector('pre');
      if (!pre) return;
      const text = pre.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
      }
    });
  });

  updateProgress();
})();
