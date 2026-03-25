const EASTER_EGG_AUDIO = new Audio();

// verifica se está rodando no GitHub Pages
let is_github_pages = window.location.hostname.includes("github.io");

// pega o nome do repositório (primeira parte da URL depois da barra)
let repo_name = is_github_pages
  ? `/${window.location.pathname.split("/")[1]}`
  : "";

// monta e retorna os caminhos dos áudios já corrigidos :)
let easter_egg_audios_path = [
  `${repo_name}/assets/audios/easter_egg/1.mp3`,
  `${repo_name}/assets/audios/easter_egg/2.mp3`,
  `${repo_name}/assets/audios/easter_egg/3.mp3`,
  `${repo_name}/assets/audios/easter_egg/4.mp3`,
];

let is_active = false; // limitando a ativação do easter egg
let last_audio_played = "";

export function easter_egg_function() {
  if (is_active) return;

  is_active = true;

  const easter_egg = document.createElement("img");
  easter_egg.src = "assets/imgs/easter_egg.jpg";
  easter_egg.style.height = "20rem";
  easter_egg.style.width = "50rem";
  easter_egg.style.position = "absolute";
  easter_egg.style.left = "0";
  easter_egg.style.top = "50%";
  easter_egg.style.transform = "translate(0, -50%)";
  const anim = easter_egg.animate(
    [
      { transform: "translate(-60rem, -50%)" },
      { transform: "translate(100vw, -50%)" },
    ],
    {
      duration: 2000,
      easing: "ease-in-out",
    },
  );

  let new_audio;

  // garante que não repete o último áudio
  do {
    new_audio =
      easter_egg_audios_path[
        Math.floor(Math.random() * easter_egg_audios_path.length)
      ];
  } while (
    new_audio === last_audio_played &&
    easter_egg_audios_path.length > 1
  );

  last_audio_played = new_audio;
  EASTER_EGG_AUDIO.src = new_audio;

  EASTER_EGG_AUDIO.play();

  anim.onfinish = () => {
    easter_egg.remove();
    EASTER_EGG_AUDIO.pause();
    EASTER_EGG_AUDIO.src = "";
    is_active = false;
  };
  document.body.appendChild(easter_egg);
}
