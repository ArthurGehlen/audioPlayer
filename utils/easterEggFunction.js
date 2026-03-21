const EASTER_EGG_AUDIO = new Audio();

const easter_egg_audios_path = [
  "../assets/audios/easter_egg/1.mp3",
  "../assets/audios/easter_egg/2.mp3",
  "../assets/audios/easter_egg/3.mp3",
  "../assets/audios/easter_egg/4.mp3",
  "../assets/audios/easter_egg/5.mp3",
];

let is_active = false; // limitando a ativação do easter egg

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
  EASTER_EGG_AUDIO.src =
    easter_egg_audios_path[
      Math.floor(Math.random() * easter_egg_audios_path.length)
    ];

  EASTER_EGG_AUDIO.play();

  anim.onfinish = () => {
    easter_egg.remove();
    EASTER_EGG_AUDIO.pause();
    EASTER_EGG_AUDIO.src = "";
    is_active = false;
  };
  document.body.appendChild(easter_egg);
}
