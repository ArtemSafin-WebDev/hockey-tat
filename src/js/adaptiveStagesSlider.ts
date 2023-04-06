import Swiper, { SwiperOptions, Autoplay, Grid } from "swiper";
import "swiper/css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "./vendor/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

function adaptiveStagesSlider(
  selector: string = ".js-adaptive-stages-slider"
): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  console.log("Adaptive stages", elements);

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

    console.log("Active bullet", activeBullet, index, bullets);
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
              if (instance.isEnd) {
                instance.slideTo(0);
              } else {
                instance.slideNext();
              }
            }
          },
        }
      );
    }
  };

  const stopAutoplay = (bullets: HTMLLIElement[]) => {
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
  };

  elements.forEach((element) => {
    const container: HTMLElement | null = element.querySelector(".swiper");
    const bullets = Array.from(
      element.querySelectorAll<HTMLLIElement>(
        ".adaptive-stages__slider-pagination-bullet"
      )
    );

    let autoplayDisabled = false;

    console.log(container, bullets);
    if (!container) return;
    let sliderInstance: Swiper | null = null;
    const options: SwiperOptions = {
      modules: [Autoplay, Grid],
      grid: {
        rows: 3,
        fill: "row",
      },
      spaceBetween: 0,
      slidesPerView: 2,
      slidesPerGroup: 2,
      speed: 500,
      init: false,
      on: {
        init: (swiper) => {
          autoplayAtIndex(swiper.snapIndex, swiper, bullets);
        },
        slideChange: (swiper) => {
          bullets.forEach((bullet, bulletIndex) => {
            bullet.classList.remove("current");
            if (bulletIndex === swiper.snapIndex) {
              bullet.classList.add("current");
            }
          });
          if (autoplayDisabled) return;
          console.log("Slide change", swiper.activeIndex, swiper.snapIndex);
          autoplayAtIndex(swiper.snapIndex, swiper, bullets);
        },
      },
    };

    const mql = window.matchMedia("(min-width: 641px)");

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        console.log("Instantiating");
        sliderInstance = new Swiper(container, options);
        sliderInstance.init();
      } else {
        if (sliderInstance) {
          console.log("Destroying");
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

        const slideToIndex = bulletIndex * 2;
        console.log("slideToIndex", slideToIndex);

        sliderInstance?.slideTo(slideToIndex);

        stopAutoplay(bullets);
        autoplayDisabled = true;
        element.classList.add("autoplay-disabled");
      });
    });
  });
}

export default adaptiveStagesSlider;
