
/* Student-approved groups (separate from original PixPlot KMeans hotspots).
   No new computation: switches which hotspot index lists are displayed.
*/
(function () {
  'use strict';
  const autoButton = document.getElementById('review-auto');
  const reviewedButton = document.getElementById('review-manual');
  const description = document.getElementById('review-desc');
  const status = document.getElementById('review-status');
  const automatic = [{"images":[0,3,4,5,23,24,25,34,37,40,57,58,61,62,64],"img":"B24P31.jpg","layout":"inception_vectors","label":"Cluster 1"},{"images":[1,2,12,15,27,28,29,30,31,32,33,36,38],"img":"B24P05.jpg","layout":"inception_vectors","label":"Cluster 2"},{"images":[6,7,8,9,16,17,18,19,20,22,26],"img":"B16P27.jpg","layout":"inception_vectors","label":"Cluster 3"},{"images":[42,43,44,45,46,47,48,49,55,56,63],"img":"B24P30.jpg","layout":"inception_vectors","label":"Cluster 4"},{"images":[10,11,39,41,50,51,52,53,54],"img":"B24P21.jpg","layout":"inception_vectors","label":"Cluster 5"},{"images":[13,14,21,35],"img":"B16P36.jpg","layout":"inception_vectors","label":"Cluster 6"},{"images":[59,60],"img":"B24P27.jpg","layout":"inception_vectors","label":"Cluster 7"}];
  const reviewed = [{"images":[34,36,38],"img":"B16P35.jpg","layout":"student_human_review","label":"01｜村落景觀與鄉郊舊建築"},{"images":[0,1,2,3,4,5,14],"img":"B16P01.jpg","layout":"student_human_review","label":"02｜中國傳統宗教建築"},{"images":[6,7,8,9,16,17,18,20,21,22],"img":"B16P07.jpg","layout":"student_human_review","label":"03｜中國宗教室內、神像與祭壇"},{"images":[12,15,19,28,29,30,31,32,33,37],"img":"B16P13.jpg","layout":"student_human_review","label":"04｜民間信仰、風水與鎮護設施"},{"images":[23,24,25,26,27],"img":"B16P24.jpg","layout":"student_human_review","label":"05｜西方宗教建築與設施"},{"images":[10,11,13],"img":"B16P11.jpg","layout":"student_human_review","label":"06｜人物活動與田野留影"},{"images":[39,40],"img":"B24P06.jpg","layout":"student_human_review","label":"07｜鄉郊草地與小徑"},{"images":[41,42,43,44,45,46,47,48,49],"img":"B24P08.jpg","layout":"student_human_review","label":"08｜泥灘、淺水與岩岸"},{"images":[50,51,52,53,54,55,56,63],"img":"B24P17.jpg","layout":"student_human_review","label":"09｜山水、水灣與水岸基建"},{"images":[57,58,59,60,61,62,64],"img":"B24P24.jpg","layout":"student_human_review","label":"10｜高樓、山坡與城市發展"},{"images":[35],"img":"B16P36.jpg","layout":"student_human_review","label":"—｜未分類／待核對"}];
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
  // Avoid auxiliary fetch requests: GitHub Pages can transiently return 503.
  // The data below are exact copies of the original untouched hotspot files.
  let attempts = 0;
  const poll = setInterval(function () {
    attempts++;
    if (update() || attempts > 240) clearInterval(poll);
    if (attempts > 240) status.textContent = 'PixPlot 未能完成載入，請重新整理頁面。';
  }, 250);
  setActive('reviewed');
})();
