const audio = document.getElementById("audio");
const audioSource = document.getElementById("audioSource");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const nowPlaying = document.getElementById("nowPlaying");
const playPauseBtn = document.getElementById("playPause");

let songs = [
    {id: 'repo', title: 'R.E.P.O', artist: 'Młody AI', file: 'repo.mp3', cover: 'repo.jpg'},
    {id: 'yeah', title: 'Yeah', artist: 'Młody AI', file: 'yeah.mp3', cover: 'yeah.jpg'}
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audioSource.src = song.file;
    audio.load();
    nowPlaying.innerText = `${song.artist} – ${song.title}`;
}

function playSong(index) {
    if (index !== undefined) currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.innerText = '⏸';
}

// toggle play/pause
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = '⏸';
    } else {
        audio.pause();
        playPauseBtn.innerText = '▶';
    }
}

// Pasek czasu
audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration);
    duration.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime);
    current.innerText = formatTime(audio.currentTime);
});

// Autoplay next
audio.addEventListener("ended", () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    playSong(currentSongIndex);
});

// Pasek interaktywny
progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

// format czasu
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0'+s : s}`;
}

// inicjalizacja
loadSong(currentSongIndex);
