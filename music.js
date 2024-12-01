document.addEventListener('DOMContentLoaded', () => {
  const musicCards = document.querySelectorAll('.music-card');
  const audio = new Audio();
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.querySelector('.progress');
  const progressArea = document.querySelector('.progress-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const currentSongImg = document.getElementById('current-song-img');
  const currentSongTitle = document.getElementById('current-song-title');
  const currentSongArtist = document.getElementById('current-song-artist');

  let currentSongIndex = 0;
  let isPlaying = false;

  const songs = Array.from(musicCards).map(card => ({
    src: card.dataset.src,
    title: card.querySelector('h4').textContent,
    artist: card.querySelector('p').textContent,
    img: card.querySelector('img').src
  }));

  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    currentSongImg.src = song.img;
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    
    // Update active state on cards
    musicCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }

  function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
  }

  function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Update time displays
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Event Listeners
  playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
  });

  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  audio.addEventListener('timeupdate', updateProgress);
  progressArea.addEventListener('click', setProgress);

  audio.addEventListener('ended', nextSong);

  musicCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
  });

  // Load first song
  loadSong(0);
});
