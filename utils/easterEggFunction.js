export function easter_egg_function() {
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
      duration: 1250,
      easing: "ease-in-out",
    },
  );

  anim.onfinish = () => {
    easter_egg.remove();
  };
  document.body.appendChild(easter_egg);
}
