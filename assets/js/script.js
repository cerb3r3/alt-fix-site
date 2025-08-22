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

// ==============================
// 🎵 Lecteur simple (1 piste, Play/Pause + Volume)
// ==============================
(() => {
  // Ton fichier (mets-le à: assets/music/videoplayback.m4a)
  const AUDIO_SRC = 'assets/music/videoplayback.m4a';

  let audio;

  const $ = (id) => document.getElementById(id);

  function initPlayer(){
    audio = $('bg-music');
    if (!audio) return;

    // Source + options
    audio.src = AUDIO_SRC;
    audio.preload = 'metadata';

    // Volume initial (restauré si déjà réglé)
    const savedVol = localStorage.getItem('musicVolume');
    audio.volume = savedVol ? Math.min(1, Math.max(0, parseFloat(savedVol))) : 0.2;

    // --- Bouton Play/Pause
    const btn = $('play-toggle');
    const syncBtn = () => { if (btn) btn.textContent = audio.paused ? '▶️ Lancer' : '⏸️ Pause'; };

    if (btn){
      btn.addEventListener('click', async () => {
        try {
          if (audio.paused) { await audio.play(); }
          else { audio.pause(); }
        } catch(e){ /* si autoplay bloqué, le clic débloque */ }
        syncBtn();
      });
    }

    // --- Slider volume
    const vol = $('volume');
    if (vol){
      vol.value = String(audio.volume);
      vol.addEventListener('input', () => {
        const v = Math.min(1, Math.max(0, parseFloat(vol.value)));
        if (!isNaN(v)) {
          audio.volume = v;
          localStorage.setItem('musicVolume', String(v));
        }
      });
    }

    // Met à jour le texte du bouton si l’état change
    audio.addEventListener('play',  syncBtn);
    audio.addEventListener('pause', syncBtn);
    audio.addEventListener('ended', syncBtn);

    syncBtn();
  }

  window.addEventListener('DOMContentLoaded', initPlayer);
})();

