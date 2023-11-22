const slides = document.querySelectorAll(".slider-container__img-slide");
const dotContainer = document.querySelector(".slider-container__dots");
const speedSlider = 5000;
const slidesNumber = slides.length;
let autoPlayInterval;

// Слайдер
slides.forEach((slide, index) => (slide.style.transform = `translateX(${index * 100}%)`));

// Точки
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML("beforeend", `<button class="slider-container__dots-dot" data-slide="${index}"></button>`);
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document.querySelectorAll(".slider-container__dots-dot").forEach((dot) => dot.classList.remove("slider-container__dots-dot--active"));
  document.querySelector(`.slider-container__dots-dot[data-slide="${slide}"]`).classList.add("slider-container__dots-dot--active");
};

activateCurrentDot(0);
let currentSlide = 0;

const moveToSlide = function (slide) {
  slides.forEach((s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`));
};

const startAutoPlay = function (startSlide = 0) {
  currentSlide = startSlide;
  autoPlayInterval = setInterval(() => {
    if (currentSlide === slidesNumber - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
  }, speedSlider);
};

const stopAutoPlay = function () {
  clearInterval(autoPlayInterval);
};

// Нажатие на точки
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-container__dots-dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
    stopAutoPlay();
    startAutoPlay(slide);
  }
});

// Auto play
startAutoPlay();
