import Swiper, { Controller, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

import { gsap } from "gsap";
import { DrawSVGPlugin } from "./vendor/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

function histAkBars(
  selector: string = ".js-hist-akbars",
  _autoplay = true,
  _autoplayDuration = 8
): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const mainContainer = element.querySelector<HTMLDivElement>(
      ".hist-akbars__cups-main-slider .swiper"
    );

    const textContainer = element.querySelector<HTMLDivElement>(
      ".hist-akbars__cups-text-slider .swiper"
    );
    const bullets = Array.from(
      element.querySelectorAll<HTMLLIElement>(".hist-akbars__pagination-bullet")
    );

    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(
        ".hist-akbars__cups-main-slider-card"
      )
    );

    let instance: Swiper | null = null;
    let textInstance: Swiper | null = null;

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

    if (mainContainer) {
      instance = new Swiper(mainContainer, {
        modules: [Controller],
        speed: 500,
        slidesPerView: "auto",
        slideToClickedSlide: true,
        threshold: 10,
        breakpoints: {
          641: {
            slidesPerView: 4,
          },
        },
      });
    }

    if (textContainer) {
      textInstance = new Swiper(textContainer, {
        modules: [EffectFade],
        speed: 500,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        init: false,
        allowTouchMove: true,
        autoHeight: true,
        on: {
          init: (swiper) => {
            autoplayAtIndex(swiper.realIndex, swiper, bullets);
            cards.forEach((card) => card.classList.remove("active"));
            cards[swiper.realIndex]?.classList.add("active");
          },
          slideChange: (swiper) => {
            autoplayAtIndex(swiper.realIndex, swiper, bullets);
            console.log("Slide index", swiper.realIndex);
            cards.forEach((card) => card.classList.remove("active"));
            cards[swiper.realIndex]?.classList.add("active");

            console.log("Text slider progress", swiper.progress);

            instance.setProgress(swiper.progress, 600);
          },
        },
        // controller: {
        //   control: window.matchMedia("(max-width: 640px)").matches
        //     ? instance
        //       ? instance
        //       : null
        //     : null,
        // },
      });

      textInstance.init();

      // if (window.matchMedia("(max-width: 640px)").matches) {
      //   instance.controller.control = textInstance ? textInstance : null;
      // }
    }

    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        textInstance?.slideTo(bulletIndex);
      });
    });

    cards.forEach((card, cardIndex) => {
      card.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        // if (!window.matchMedia("(max-width: 640px)").matches) {
        //   textInstance?.slideTo(cardIndex);
        // }

        console.log("Card clicked");

        textInstance?.slideTo(cardIndex);
      });
    });
  });
}

export default histAkBars;
