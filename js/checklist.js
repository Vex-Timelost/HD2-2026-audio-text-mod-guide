// ── PROGRESS TRACKER ─────────────────────────
const checkItems = document.querySelectorAll('.check-item[data-id]');

function updateProgress() {
  const total = checkItems.length;
  let done = 0;
  checkItems.forEach(item => {
    if (localStorage.getItem('hd2-check-' + item.dataset.id) === '1') done++;
  });
  const pct = total > 0 ? (done / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-done').textContent = done;
  document.getElementById('progress-total').textContent = total;
}

function applyCheckState(item) {
  const val = localStorage.getItem('hd2-check-' + item.dataset.id);
  if (val === '1') {
    item.classList.add('checked');
  } else {
    item.classList.remove('checked');
  }
}

checkItems.forEach(item => {
  applyCheckState(item);
  item.addEventListener('click', () => {
    const isChecked = item.classList.contains('checked');
    if (isChecked) {
      localStorage.setItem('hd2-check-' + item.dataset.id, '0');
      item.classList.remove('checked');
    } else {
      localStorage.setItem('hd2-check-' + item.dataset.id, '1');
      item.classList.add('checked');
    }
    updateProgress();
    buildGlobalChecklist();
  });
});
updateProgress();

// ── GLOBAL CHECKLIST ON HOME PAGE ────────────
const chapterLabels = {
  'c01': '01 — Installing Mods',
  'c02': '02 — Tools Setup',
  'c03': '03 — Mod Basics',
  'c04': '04 — Voice & SFX',
  'c05': '05 — Music Mods',
  'c06': '06 — Advanced',
};

function buildGlobalChecklist() {
  const container = document.getElementById('global-checklist');
  if (!container) return;
  container.innerHTML = '';

  const groups = {};
  checkItems.forEach(item => {
    const prefix = item.dataset.id.split('-').slice(0, 1)[0];
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(item);
  });

  Object.entries(groups).forEach(([prefix, items]) => {
    const div = document.createElement('div');
    div.className = 'checklist';
    div.style.marginBottom = '1rem';

    const title = document.createElement('div');
    title.className = 'checklist-title';
    title.textContent = '✦ CHAPTER ' + (chapterLabels[prefix] || prefix).toUpperCase();
    div.appendChild(title);

    items.forEach(src => {
      const clone = document.createElement('label');
      clone.className = 'check-item' + (src.classList.contains('checked') ? ' checked' : '');
      clone.dataset.globalId = src.dataset.id;
      clone.innerHTML = `<div class="check-box"></div><span class="check-label">${src.querySelector('.check-label').textContent}</span>`;
      clone.addEventListener('click', () => {
        src.click();
        buildGlobalChecklist();
      });
      div.appendChild(clone);
    });

    container.appendChild(div);
  });
}
buildGlobalChecklist();
