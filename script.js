const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');

const songs = [
    { title: "Song 1", src: "song1.mp3" },
    { title: "Song 2", src: "song2.mp3" },
    { title: "Song 3", src: "song3.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.src;
    songTitle.textContent = song.title;
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
}

function playPauseMusic() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playPauseMusic();
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playPauseMusic();
}

function updateSeekBar() {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', updateSeekBar);
seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

playPauseBtn.addEventListener('click', playPauseMusic);
prevBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);

// Load the first song on page load
loadSong(currentSongIndex);
