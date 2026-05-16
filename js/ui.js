// ── PAGE NAVIGATION ──────────────────────────
const pages = ['home', 'install', 'tools', 'basics', 'voice', 'music', 'advanced'];

function showPage(id, clickedBtn) {
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.remove('active');
  });
  document.getElementById('page-' + id).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (clickedBtn) clickedBtn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── THEME TOGGLE ─────────────────────────────
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next === 'dark' ? '' : 'light');
  document.getElementById('theme-btn').textContent = next === 'light' ? '☾ DARK' : '☀ LIGHT';
  localStorage.setItem('hd2-theme', next);
}

// ── THEME INIT ───────────────────────────────
(function () {
  const saved = localStorage.getItem('hd2-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById('theme-btn').textContent = '☾ DARK';
  }
})();
