import Swiper, { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "./vendor/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

function quotesSlider(
  selector: string = ".js-quotes-slider",
  autoplay = true,
  autoplayDuration = 8
): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const container = element.querySelector<HTMLDivElement>(".swiper");
    const bullets = Array.from(
      element.querySelectorAll<HTMLLIElement>(
        ".quotes-slider__pagination-bullet"
      )
    );

    let instance: Swiper | null = null;

    const autoplayAtIndex = (index: number): void => {
      if (!autoplay) return;
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
            duration: autoplayDuration,
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

    if (container) {
      instance = new Swiper(container, {
        modules: [EffectFade],
        speed: 500,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        loop: true,
        on: {
          init: (swiper) => {
            autoplayAtIndex(swiper.realIndex);
          },
          slideChange: (swiper) => {
            autoplayAtIndex(swiper.realIndex);
          },
        },
      });

      instance.init();
    }

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        instance?.slideToLoop(bulletIndex);
      });
    });
  });
}

export default quotesSlider;
