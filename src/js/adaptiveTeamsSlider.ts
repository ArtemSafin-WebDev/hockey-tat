import Swiper, { SwiperOptions, Autoplay } from "swiper";
import "swiper/css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "./vendor/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

function adaptiveTeamsSlider(
  selector: string = ".js-adaptive-teams-slider"
): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  const autoplayAtIndex = (
    index: number,
    instance: Swiper,
    bullets: HTMLLIElement[]
  ): void => {
    bullets.forEach((bullet) => {
      bullet.classList.remove("active");
      const circle = bullet.querySelector<SVGCircleElement>(
        "svg:nth-child(2) circle"
      );
      gsap.killTweensOf(circle);
      gsap.set(circle, {
        drawSVG: "0% 0%",
      });
    });

    const activeBullet = bullets[index];
    if (activeBullet) {
      activeBullet.classList.add("active");

      const circle = activeBullet.querySelector<SVGCircleElement>(
        "svg:nth-child(2) circle"
      );

      gsap.fromTo(
        circle,
        { drawSVG: "0% 0%" },
        {
          duration: 8,
          drawSVG: "0% 100%",
          ease: "none",
          onComplete: () => {
            if (instance) {
              instance.slideNext();
            }
          },
        }
      );
    }
  };

  elements.forEach((element) => {
    const container: HTMLElement | null = element.querySelector(".swiper");
    const bullets = Array.from(
      element.querySelectorAll<HTMLLIElement>(
        ".adaptive-teams__pagination-bullet"
      )
    );
    if (!container) return;
    let sliderInstance: Swiper | null = null;
    const options: SwiperOptions = {
      modules: [Autoplay],
      centeredSlides: true,
      centeredSlidesBounds: false,
      spaceBetween: 0,
      slidesPerView: "auto",
      speed: 500,
      init: false,
      loop: true,
      loopedSlides: 6,
      on: {
        init: (swiper) => {
          autoplayAtIndex(swiper.realIndex, swiper, bullets);
        },
        slideChange: (swiper) => {
          autoplayAtIndex(swiper.realIndex, swiper, bullets);
        },
      },
    };

    const mql = window.matchMedia("(max-width: 640px)");

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        sliderInstance = new Swiper(container, options);
        sliderInstance.init();
      } else {
        if (sliderInstance) {
          sliderInstance.destroy();
          sliderInstance = null;
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        sliderInstance?.slideToLoop(bulletIndex);
      });
    });
  });
}

export default adaptiveTeamsSlider;
