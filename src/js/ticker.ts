import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ticker(
  selector: string = ".js-ticker",
  childSelector = ".js-ticker-inner"
) {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const innerTicker = element.querySelector<HTMLDivElement>(childSelector);
    if (!innerTicker) return;
    let clones = [];

    for (let i = 0; i < 3; i++) {
      const clone = innerTicker.cloneNode(true);
      const parent = innerTicker.parentElement;
      if (parent) {
        parent.append(clone);
        clones.push(clone);
      }
    }

    [...clones, innerTicker].forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(item, {
        xPercent: -100,
        duration: 1,
      });
    });
  });
}

export default ticker;
