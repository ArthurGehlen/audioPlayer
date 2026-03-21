import { easter_egg_function } from "../utils/easterEggFunction.js";
import { change_music_state } from "../script.js";

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
