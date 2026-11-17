
/* Student-approved groups (separate from original PixPlot KMeans hotspots).
   No new computation: switches which hotspot index lists are displayed.
*/
(function () {
  'use strict';
  const autoButton = document.getElementById('review-auto');
  const reviewedButton = document.getElementById('review-manual');
  const description = document.getElementById('review-desc');
  const status = document.getElementById('review-status');
  let automatic = null, reviewed = null;
  let requested = 'reviewed';
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function setActive(mode) {
    autoButton.classList.toggle('active', mode === 'automatic');
    reviewedButton.classList.toggle('active', mode === 'reviewed');
    autoButton.setAttribute('aria-pressed', String(mode === 'automatic'));
    reviewedButton.setAttribute('aria-pressed', String(mode === 'reviewed'));
    description.innerHTML = mode === 'automatic'
      ? '<strong>Automatic KMeans — 7 clusters</strong><div>視覺特徵分組，由 PixPlot 原始模型產生。</div>'
      : '<strong>Human-reviewed — 10 groups + 1 uncertain</strong><div>學生核對的主題分類，與機器自動分組不同。</div>';
  }
  function update() {
    if (!automatic || !reviewed || !window.data || !data.hotspots || !Array.isArray(data.hotspots.json) || !data.cells || data.cells.length !== 65) {
      status.textContent = '正在載入分類資料…';
      return false;
    }
    data.hotspots.setEdited(false);
    data.hotspots.handleJson(clone(requested === 'automatic' ? automatic : reviewed));
    setActive(requested);
    status.textContent = '';
    return true;
  }
  function select(mode) { requested=mode; update(); }
  autoButton.addEventListener('click', function () { select('automatic'); });
  reviewedButton.addEventListener('click', function () { select('reviewed'); });
  // Relative paths work in any static hosting directory, including GitHub Pages.
  Promise.all([
    fetch('data/hotspots/hotspot-bfe3c3b8-e273-11f1-9c03-0a555dc3ca8a.json').then(r => { if(!r.ok)throw Error('automatic: '+r.status); return r.json(); }),
    fetch('data/hotspots/reviewed_subject_groups.json').then(r => { if(!r.ok)throw Error('reviewed: '+r.status); return r.json(); })
  ]).then(function (sets) {
    automatic = sets[0]; reviewed = sets[1];
    // The PixPlot startup data and textures load asynchronously; wait until ready.
    const poll = setInterval(function() {
      if (update()) clearInterval(poll);
    }, 250);
  }).catch(function(err) {
    status.textContent = '分類資料載入失敗：' + err.message;
    console.error(err);
  });
  setActive('reviewed');
})();
