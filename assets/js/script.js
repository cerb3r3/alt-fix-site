// ==============================
// ALT-FIX — script global
// ==============================

// Burger menu (mobile)
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
}

// ==============================
// 🎵 Musique de fond (playlist)
// ==============================
const tracks = [
  "assets/music/piano-chill.wav",
  "assets/music/lofi-soft.wav",
  "assets/music/ambient-light.wav"
];

let currentTrack = 0;

window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  if (!music) return;

  // Volume doux
  music.volume = 0.2;

  // Restaure le choix utilisateur (mute ON/OFF) entre les pages
  const savedMuted = localStorage.getItem('musicMuted');
  if (savedMuted !== null) music.muted = savedMuted === 'true';

  function loadAndPlay(i) {
    currentTrack = i % tracks.length;
    music.src = tracks[currentTrack];
    music.load();
    music.play().catch(() => {
      // Autoplay bloqué tant que l'utilisateur n'a pas interagi : normal
    });
  }

  // Lance la première piste (navigateur : start muted)
  loadAndPlay(0);

  // Enchaîne les titres
  music.addEventListener('ended', () => loadAndPlay(currentTrack + 1));

  // Expose le toggle pour le bouton HTML
  window.toggleMusic = function () {
    music.muted = !music.muted;
    localStorage.setItem('musicMuted', String(music.muted));
    if (!music.muted) {
      music.play().catch(() => {});
    } else {
      music.pause();
    }
  };
});
