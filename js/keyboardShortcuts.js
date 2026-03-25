import { easter_egg_function } from "../utils/easterEggFunction.js";
import { change_music_state } from "../script.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada com sucesso!");
  console.log("Easter Egg: ctrl + v");
  console.log("ou");
  console.log("Pressione o display do id da música");
});

// easter egg :)
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    change_music_state();
  }
  if (e.ctrlKey && e.key === "v") {
    e.preventDefault();
    easter_egg_function();
  }
});
