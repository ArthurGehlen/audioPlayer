// inicializa valores padrão no localStorage quando o usuário acessa o site pela primeira vez
document.addEventListener("DOMContentLoaded", () => {
  let has_theme_variable = localStorage.getItem("is_dark");
  let has_last_albun_selected = localStorage.getItem("last_albun_selected");

  if (!has_theme_variable) {
    localStorage.setItem("is_dark", "true");
  }

  if (!has_last_albun_selected) {
    localStorage.setItem("last_albun_selected", "none");
  }
});
