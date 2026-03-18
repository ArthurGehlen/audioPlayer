import {
  MUSIC_AUDIO,
  MUSIC_MAX_INDEX,
  MUSIC_MIN_INDEX,
  PAUSE_ICON_HTML,
  PLAY_ICON_HTML,
  REPEAT_ICON_HTML,
} from "./utils/constants.js";

import {
  backwards_music_btn,
  composer_display,
  forwards_music_btn,
  music_album_cover,
  music_id_display,
  music_name_display,
  recommended_by_display,
  play_btn,
  progress_bar,
  progress_bar_wrapper,
  timestamp,
  toggle_configs_btn,
  configs_container,
  loop_btn,
} from "./utils/htmlConstants.js";

import { easter_egg_function } from "./utils/easterEggFunction.js";

// TODO: fazer sistema de volume

// futuramente quero adicionar um sistema para o usuário enviar a música
// por hora eu vou providenciar as músicas
let current_music_index = 1;
let current_music_state = "pause";
let is_loop_active = false;
let local_musics = {};

async function fetch_data() {
  const res = await fetch("data.json");

  if (!res.ok) {
    throw new Error(`ERRO! Status: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

function change_music_state() {
  if (!MUSIC_AUDIO) return;

  if (current_music_state == "pause" || current_music_state == "replay") {
    play_btn.innerHTML = PAUSE_ICON_HTML;
    MUSIC_AUDIO.play();
    current_music_state = "play";
  } else {
    play_btn.innerHTML = PLAY_ICON_HTML;
    MUSIC_AUDIO.pause();
    current_music_state = "pause";
  }
}

// easter egg :)
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    change_music_state();
  }
  if (e.ctrlKey && e.key === "m") {
    e.preventDefault();
    easter_egg_function();
  }
});

async function load_music(music_obj) {
  music_id_display.textContent = music_obj.id;
  music_name_display.textContent = music_obj.name;
  composer_display.textContent = music_obj.composer;
  music_album_cover.src = music_obj.img_path;
  MUSIC_AUDIO.src = music_obj.audio_path;
  recommended_by_display.textContent = `Recomendado por: ${music_obj.recommended_by}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  update_progress_bar();
  local_musics = await fetch_data();
  load_music(local_musics[`music${current_music_index}`]);
});

function get_music_duration() {
  if (!MUSIC_AUDIO.duration || isNaN(MUSIC_AUDIO.duration)) return "0:00";

  let raw_duration = MUSIC_AUDIO.duration; // retorna a duração da música em segundos
  let minutes = Math.floor(raw_duration / 60);
  let seconds = Math.floor(raw_duration % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`; // retorna a duração formatada da música :)
}

function update_progress_bar() {
  if (!MUSIC_AUDIO.duration) return;

  const percentage = (MUSIC_AUDIO.currentTime / MUSIC_AUDIO.duration) * 100;
  progress_bar.style.width = percentage + "%";

  if (percentage >= 2) {
    progress_bar.classList.add("show-circle");
  } else {
    progress_bar.classList.remove("show-circle");
  }
}

function get_audio_current_time() {
  let audio_current_time = Math.floor(MUSIC_AUDIO.currentTime);

  let minutes = Math.floor(audio_current_time / 60);
  let seconds = Math.floor(audio_current_time % 60);

  seconds = seconds.toString().padStart(2, "0");

  let music_duration = get_music_duration();

  if (timestamp) {
    timestamp.textContent = `${minutes}:${seconds}/${music_duration}`;
  }
}

// atualiza a barra de progresso de acordo com a duração da música
MUSIC_AUDIO.addEventListener("timeupdate", () => {
  update_progress_bar();
  get_audio_current_time();
});

MUSIC_AUDIO.addEventListener("ended", () => {
  if (is_loop_active) {
    MUSIC_AUDIO.currentTime = 0;
    MUSIC_AUDIO.play();
  } else {
    play_btn.innerHTML = REPEAT_ICON_HTML;
    current_music_state = "replay";
  }
});

// calcula a posição do click relativo ao container pai (largura fixa)
progress_bar_wrapper.addEventListener("click", (e) => {
  const rect = progress_bar_wrapper.getBoundingClientRect();
  const percentage = (e.clientX - rect.left) / rect.width;
  MUSIC_AUDIO.currentTime = percentage * MUSIC_AUDIO.duration; // converte em porcentagem e pula para esse ponto do audio

  if (current_music_state == "replay") {
    current_music_state = "pause";
    play_btn.innerHTML = PLAY_ICON_HTML;
  }
});

MUSIC_AUDIO.addEventListener("loadedmetadata", async () => {
  get_audio_current_time();
});

// para lidar com erros mais facilmente no futuro :)
MUSIC_AUDIO.addEventListener("error", () => {
  console.error("Erro ao carregar áudio:", MUSIC_AUDIO.error);
});

// tive problemas com a política de reprodução automática do chrome :(
// então a música só vai começar a tocar quando clicar na página
play_btn.addEventListener("click", () => {
  change_music_state();
});

forwards_music_btn.addEventListener("click", () => {
  if (current_music_index == MUSIC_MAX_INDEX) return;

  current_music_index += 1;
  load_music(local_musics[`music${current_music_index}`]);

  MUSIC_AUDIO.addEventListener(
    "loadedmetadata",
    () => {
      MUSIC_AUDIO.currentTime = 0;
      update_progress_bar();
      get_audio_current_time();

      if (current_music_state == "play") {
        current_music_state = "pause";
        play_btn.innerHTML = PLAY_ICON_HTML;
      }
    },
    { once: true },
  ); // once: true para não acumular listeners
});

backwards_music_btn.addEventListener("click", () => {
  if (current_music_index == MUSIC_MIN_INDEX) return;

  current_music_index -= 1;
  load_music(local_musics[`music${current_music_index}`]);

  MUSIC_AUDIO.addEventListener(
    "loadedmetadata",
    () => {
      MUSIC_AUDIO.currentTime = 0;
      update_progress_bar();
      get_audio_current_time();

      if (current_music_state == "play") {
        current_music_state = "pause";
        play_btn.innerHTML = PLAY_ICON_HTML;
      }
    },
    { once: true },
  );
});

toggle_configs_btn.addEventListener("click", () => {
  toggle_configs_btn.classList.toggle("configs_btn_active");
  configs_container.classList.toggle("configs_container_active");
});

loop_btn.addEventListener("click", () => {
  loop_btn.classList.toggle("loop_active");

  is_loop_active ? (is_loop_active = false) : (is_loop_active = true);
});
