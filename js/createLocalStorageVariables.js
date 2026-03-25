// inicializa valores padrão no localStorage quando o usuário acessa o site pela primeira vez
document.addEventListener("DOMContentLoaded", () => {
  let has_theme_variable = localStorage.getItem("is_dark");
  let has_last_album_selected = localStorage.getItem("last_album_selected");

  if (!has_theme_variable) {
    localStorage.setItem("is_dark", "true");
  }

  if (!has_last_album_selected) {
    localStorage.setItem("last_album_selected", "none");
  }
});
