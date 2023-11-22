const header = document.querySelector(".header");
const hover = document.querySelectorAll(".navigation-list__link");
const link = document.querySelector(".link");

//Наведение на header
for (let i = 0; i < hover.length; i++) {
  hover[i].addEventListener("mouseover", function () {
    hover[i].classList.add("homing");
    link.classList.remove("link");
  });

  hover[i].addEventListener("mouseout", function () {
    hover[i].classList.remove("homing");
    link.classList.add("link");
  });
}
//Прилипший header

window.addEventListener("scroll", function () {
  if (this.window.scrollY > 144) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});
