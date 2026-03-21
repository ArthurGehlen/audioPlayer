import {
  change_theme_wrapper,
  current_theme_display,
  theme_switcher_btn,
} from "../utils/htmlConstants.js";

let is_dark = true;

document.addEventListener("DOMContentLoaded", () => {
  const saved_is_dark = localStorage.getItem("is_dark");

  // se nunca foi salvo assume dark como padrão
  is_dark = saved_is_dark === null ? true : saved_is_dark === "true";

  document.documentElement.setAttribute(
    "data-theme",
    is_dark ? "dark" : "light",
  );

  theme_switcher_btn.checked = !is_dark;

  change_theme_wrapper.classList.add("change_theme_btn_checked");
  current_theme_display.textContent = is_dark ? "Dark Mode" : "Light Mode";
});

theme_switcher_btn.addEventListener("click", () => {
  is_dark = !theme_switcher_btn.checked;
  localStorage.setItem("is_dark", is_dark);
  document.documentElement.setAttribute(
    "data-theme",
    is_dark ? "dark" : "light",
  );
  current_theme_display.textContent = is_dark ? "Dark Mode" : "Light Mode";
});
