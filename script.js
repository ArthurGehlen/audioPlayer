const timestamp = document.getElementById("timestamp");
const progress_bar = document.getElementById("progress_bar");
const container = document.getElementById("container");

const main_music = new Audio();
main_music.src = "assets/music1.mp3";

// não sei oq isso vai virar :)

function get_music_duration() {
  let raw_duration = main_music.duration; // retorna a duração da música em segundos

  let duration_minutes = Math.floor(raw_duration / 60);
  let duration_seconds = Math.floor(raw_duration % 60);

  duration_seconds = duration_seconds.toString().padStart(2, "0");

  return `${duration_minutes}:${duration_seconds}`; // retorna a duração formatada da música :)
}

function get_audio_current_time() {
  let audio_current_time = Math.floor(main_music.currentTime);

  let minutes = Math.floor(audio_current_time / 60);
  let seconds = Math.floor(audio_current_time % 60);

  seconds = seconds.toString().padStart(2, "0");

  let music_duration = get_music_duration();

  if (timestamp) {
    timestamp.textContent = `${minutes}:${seconds}/${music_duration}`;
  }
}

// atualiza a barra de progresso de acordo com a duração da música
main_music.addEventListener("timeupdate", () => {
  const percentage = (main_music.currentTime / main_music.duration) * 100;
  progress_bar.style.width = percentage + "%";
});

// calcula a posição do click relativo ao container pai (largura fixa)
container.addEventListener("click", (e) => {
  const rect = container.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  main_music.currentTime = percentage * main_music.duration; // converte em porcentagem e pula para esse ponto do audio
});

container.addEventListener("click", (e) => {
  const rect = container.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  main_music.currentTime = percentage * main_music.duration;
});

main_music.addEventListener("loadedmetadata", () => {
  get_audio_current_time();
});

setInterval(get_audio_current_time, 1000);

document.addEventListener("DOMContentLoaded", () => {
  main_music.play();
  main_music.volume = 0;
});
