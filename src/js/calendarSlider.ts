import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function calendarSlider(selector: string = ".js-calendar-slider"): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLDivElement>(".swiper");

    if (container !== null) {
      new Swiper(container, {
        modules: [Navigation],
        slidesPerView: 8,
        speed: 600,
        breakpoints: {
          1500: {
            slidesPerView: 10,
          },
          1800: {
            slidesPerView: 12,
          },
          1920: {
            slidesPerView: 13,
          },
        },
        navigation: {
          nextEl: element.querySelector<HTMLButtonElement>(
            ".page-header__calendar-slider-arrow--next"
          ),
          prevEl: element.querySelector<HTMLButtonElement>(
            ".page-header__calendar-slider-arrow--prev"
          ),
        },
      });
    }
  });
}

export default calendarSlider;
