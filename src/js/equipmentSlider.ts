import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function equipmentSlider(selector: string = ".js-equipment-slider"): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const container = element.querySelector(".swiper") as HTMLDivElement | null;

    if (container) {
      new Swiper(container, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 0,
        speed: 600,
        centeredSlides: true,
        centeredSlidesBounds: false,
        navigation: {
          nextEl: element.querySelector<HTMLButtonElement>(
            ".equipment__slider-arrow--next"
          ),
          prevEl: element.querySelector<HTMLButtonElement>(
            ".equipment__slider-arrow--prev"
          ),
        },
        breakpoints: {
          641: {
            slidesPerView: 4,
            spaceBetween: 28,
            centeredSlides: false,
          },
        },
      });
    }
  });
}

export default equipmentSlider;
