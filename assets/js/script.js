// ==============================
// ALT-FIX — Script global
// ==============================

// ---------- Burger menu (mobile)
(() => {
  const burger = document.querySelector('.burger');
  const menu   = document.querySelector('.menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
})();

// ---------- Lecteur musique simple (1 piste)
(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const audio  = document.getElementById('bg-music');
    const btn    = document.getElementById('play-toggle');
    const volInp = document.getElementById('volume');

    // Si la page n'a pas le lecteur, on ignore
    if (!audio || !btn || !volInp) return;

    // ⚠️ Mets ton fichier ici (place-le dans /assets/music/)
    audio.src = 'assets/music/videoplayback.m4a';
    audio.preload = 'metadata';

    // Volume initial (depuis l'input)
    audio.volume = parseFloat(volInp.value || '0.2');

    // Bouton lecture/pause
    const setBtnLabel = () => { btn.textContent = audio.paused ? '▶️ Lancer' : '⏸️ Pause'; };
    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().then(setBtnLabel).catch(() => {});
      } else {
        audio.pause();
        setBtnLabel();
      }
    });

    // Volume
    volInp.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value);
      audio.volume = Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.2;
    });

    // Si l'utilisateur utilise les contrôles système
    audio.addEventListener('play',  setBtnLabel);
    audio.addEventListener('pause', setBtnLabel);

    // Label correct au chargement
    setBtnLabel();
  });
})();
