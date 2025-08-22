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
  const AUDIO_SRC = 'assets/music/videoplayback.m4a'; // ton fichier m4a

  let audio;

  function byId(id){ return document.getElementById(id); }

  function initPlayer(){
    audio = byId('bg-music');
    if (!audio) return;

    audio.src = AUDIO_SRC;
    audio.preload = 'metadata';
    const savedVol = localStorage.getItem('musicVolume');
    audio.volume = savedVol ? Math.min(1, Math.max(0, parseFloat(savedVol))) : 0.2;

    const btn = byId('play-toggle');
    function syncBtn(){
      if (!btn) return;
      btn.textContent = audio.paused ? '▶️ Lancer' : '⏸️ Pause';
    }
    if (btn){
      btn.addEventListener('click', async () => {
        try {
          if (audio.paused) { await audio.play(); }
          else { audio.pause(); }
        } catch(e){}
        syncBtn();
      });
    }

    const vol = byId('volume');
    if (vol){
      vol.value = String(audio.volume);
      vol.addEventListener('input', () => {
        const v = Math.min(1, Math.max(0, parseFloat(vol.value)));
        audio.volume = isNaN(v) ? audio.volume : v;
        localStorage.setItem('musicVolume', String(audio.volume));
      });
    }

    audio.addEventListener('play',  syncBtn);
    audio.addEventListener('pause', syncBtn);
    audio.addEventListener('ended', syncBtn);

    syncBtn();
  }

  window.addEventListener('DOMContentLoaded', initPlayer);
})();
