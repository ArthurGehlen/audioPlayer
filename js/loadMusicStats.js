import {
  music_id_display,
  recommended_by_display,
  music_name_display,
  composer_display,
  music_album_cover,
  advice,
} from "../utils/htmlConstants.js";

document.addEventListener("DOMContentLoaded", () => {
  let last_album_selected = localStorage.getItem("last_album_selected");

  if (last_album_selected === "none") {
    music_album_cover.style.display = "none";

    music_id_display.style.display = "none";
    recommended_by_display.style.display = "none";
    music_name_display.textContent = "Nenhum álbum selecionado :(";
    composer_display.textContent = "Compositor não encontrado :(";
    advice.style.display = "block";
  }
  if (last_album_selected != "none") {
    advice.style.display = "none";
  }
});
