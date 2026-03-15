const timestamp = document.getElementById("timestamp");
const progress_bar_wrapper = document.getElementById("progress_bar_wrapper");
const play_btn = document.getElementById("play_btn");
const progress_bar = document.getElementById("progress_bar");

// futuramente quero adicionar um sistema para o usuário enviar a música
// por hora eu vou providenciar as músicas
const CURRENT_MUSIC_PATH = "assets/music1.mp3";
let current_music_state = "pause";

const music_audio = new Audio();
music_audio.src = CURRENT_MUSIC_PATH;

// TODO: botão de replay
// TODO: adicionar mais músicas (json?)

function get_music_duration() {
  let raw_duration = music_audio.duration; // retorna a duração da música em segundos

  let duration_minutes = Math.floor(raw_duration / 60);
  let duration_seconds = Math.floor(raw_duration % 60);

  duration_seconds = duration_seconds.toString().padStart(2, "0");

  return `${duration_minutes}:${duration_seconds}`; // retorna a duração formatada da música :)
}

function get_audio_current_time() {
  let audio_current_time = Math.floor(music_audio.currentTime);

  let minutes = Math.floor(audio_current_time / 60);
  let seconds = Math.floor(audio_current_time % 60);

  seconds = seconds.toString().padStart(2, "0");

  let music_duration = get_music_duration();

  if (timestamp) {
    timestamp.textContent = `${minutes}:${seconds}/${music_duration}`;
  }
}

function change_music_state() {}

// atualiza a barra de progresso de acordo com a duração da música
music_audio.addEventListener("timeupdate", () => {
  const percentage = (music_audio.currentTime / music_audio.duration) * 100;
  progress_bar.style.width = percentage + "%";
});

// calcula a posição do click relativo ao container pai (largura fixa)
progress_bar_wrapper.addEventListener("click", (e) => {
  const rect = progress_bar_wrapper.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  music_audio.currentTime = percentage * music_audio.duration; // converte em porcentagem e pula para esse ponto do audio
});

music_audio.addEventListener("loadedmetadata", () => {
  get_audio_current_time();
});

setInterval(get_audio_current_time, 1000);

// tive problemas com a política de reprodução automática do chrome
// então a música só vai começar a tocar quando clicar na página
play_btn.addEventListener("click", () => {
  if (current_music_state == "pause") {
    play_btn.innerHTML = `<i class="fa-solid fa-pause" style="color: rgb(255, 255, 255);"></i>`;
    music_audio.play();
    current_music_state = "play";
  } else {
    play_btn.innerHTML = `<i class="fa-solid fa-play" style="color: rgb(255, 255, 255);"></i>`;
    music_audio.pause();
    current_music_state = "pause";
  }
});
