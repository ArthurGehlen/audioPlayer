import {
  recommended_by_display,
  music_name_display,
  composer_display,
  music_album_cover,
  advice,
  playlist_img,
} from "../utils/htmlConstants.js";

document.addEventListener("DOMContentLoaded", () => {
  let last_playlist_selected = localStorage.getItem("last_playlist_selected");

  if (last_playlist_selected === "none") {
    music_album_cover.style.display = "none";

    recommended_by_display.style.display = "none";
    music_name_display.textContent = "Nenhuma playlist selecionada :(";
    composer_display.textContent = "Compositor não encontrado :(";
    advice.style.display = "block";
  }
  if (last_playlist_selected != "none") {
    advice.style.display = "none";
    playlist_img.classList.add("playlist_selected");
  }
});
