// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');

// Sidebar toggle
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});
// ===== Projets : filtres + voir plus =====
const LIMIT = 2;
let expanded      = false;
let currentFilter = 'all';
 
function getAllCards() {
    return [...document.querySelectorAll('.project-card[data-cat]')];
}
 
const tabBtns     = document.querySelectorAll('.tab-btn');
const toggleBtn   = document.getElementById('toggleBtn');
const toggleIcon  = document.getElementById('toggleIcon');
const toggleLabel = document.getElementById('toggleLabel');
 
function applyState() {
    const all      = getAllCards();
    const filtered = all.filter(function (c) {
        return currentFilter === 'all' || c.dataset.cat === currentFilter;
    });
 
    // cacher toutes les cartes d'abord
    all.forEach(function (c) {
        c.classList.add('hidden');
    });
 
    // afficher selon filtre + expanded
    filtered.forEach(function (c, i) {
        if (expanded || i < LIMIT) {
            c.classList.remove('hidden');
        }
    });
 
    // gérer le bouton voir plus
    if (!toggleBtn) return;
 
    const reste = filtered.length - LIMIT;
 
    if (filtered.length <= LIMIT) {
        toggleBtn.style.display = 'none';
    } else {
        toggleBtn.style.display = 'flex';
        if (expanded) {
            if (toggleIcon)  toggleIcon.className = 'bx bx-chevron-up';
            if (toggleLabel) toggleLabel.textContent = 'Voir moins';
        } else {
            if (toggleIcon)  toggleIcon.className = 'bx bx-chevron-down';
            if (toggleLabel) toggleLabel.textContent = 'Voir plus (' + reste + ' projets)';
        }
    }
}
 
// clic sur les onglets filtre
tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        currentFilter = btn.dataset.filter;
        expanded      = false;
 
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
 
        applyState();
    });
});
 
// clic sur voir plus / voir moins
if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
        expanded = !expanded;
        applyState();
    });
}
 window.addEventListener("load", () => {
  const video = document.querySelector(".back-vid");
  if (video) {
    video.muted = true;
    video.playsInline = true;
    video.load();
    video.play().catch((error) => {
      console.warn('Background video playback interrupted:', error);
      // Le navigateur peut arrêter la vidéo en économie d'énergie.
      // On ignore l'erreur pour ne pas laisser une promesse non gérée.
    });
  }
});
// lancer au démarrage
applyState();
