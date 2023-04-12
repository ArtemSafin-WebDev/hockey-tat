import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function historyAnimation() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".history")
  );

  elements.forEach((element) => {
    const slots: HTMLElement[] = Array.from(
      element.querySelectorAll(".history__photos-slot")
    );

    slots.forEach((slot) => {
      let activeIndex = 0;
      let prevActiveIndex = 0;
      let initial = true;
      const cards = Array.from(
        slot.querySelectorAll<HTMLElement>(".history__photos-card")
      ).reverse();

      function changeImages() {
        if (activeIndex > cards.length - 1) {
          activeIndex = 0;
        }

        const activeCard = cards[activeIndex];
        const prevCard = cards[prevActiveIndex];

        if (!initial) {
          cards.forEach((card) => {
            gsap.set(card, {
              zIndex: 30,
            });
          });

          if (prevCard) {
            gsap.set(prevCard, {
              zIndex: 40,
            });
          }

          gsap.set(activeCard, {
            zIndex: 50,
            autoAlpha: 0,
          });

          gsap.to(activeCard, {
            autoAlpha: 1,
            duration: 0.4,
          });
        }

        initial = false;

        prevActiveIndex = activeIndex;
        activeIndex++;

        gsap.delayedCall(2, changeImages);
      }

      changeImages();
    });
  });
}
