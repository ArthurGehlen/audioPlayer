const timestamp = document.getElementById("timestamp");

const main_music = new Audio();
main_music.src = "assets/music1.mp3";

// não sei oq isso vai virar :)

function get_music_duration() {
  let raw_duration = main_music.duration; // return the music duration in seconds
  let duration_minutes = Math.floor(raw_duration / 60);
  let duration_seconds = Math.floor(raw_duration % 60);

  return `${duration_minutes}:${duration_seconds}` // return formated music duration
}

main_music.addEventListener("loadedmetadata", () => {
    let a = get_music_duration();
    console.log(a)
});

document.addEventListener("DOMContentLoaded", () => {
    main_music.play();
    main_music.volume = 0;
});

function get_audio_current_time() {
  let audio_current_time = Math.floor(main_music.currentTime);

  timestamp.textContent = `${audio_current_time}`;
}

setInterval(get_audio_current_time, 1000);
get_audio_current_time();
