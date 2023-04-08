import Swiper, { Navigation } from "swiper";
import "swiper/css";

export default function shopSlider() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".js-shop-slider")
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");

    new Swiper(container, {
      modules: [Navigation],
      speed: 500,
      slidesPerView: "auto",
      spaceBetween: 0,
      centeredSlides: true,
      threshold: 10,
      centeredSlidesBounds: false,
      navigation: {
        nextEl: element.querySelector<HTMLButtonElement>(
          ".shop__slider-arrow--prev"
        ),
        prevEl: element.querySelector<HTMLButtonElement>(
          ".shop__slider-arrow--next"
        ),
      },
      breakpoints: {
        641: {
          slidesPerView: 6,
          spaceBetween: 20,
          centeredSlides: false,
        },
      },
    });
  });
}
