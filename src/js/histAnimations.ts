import { gsap } from "gsap";
import { SplitText } from "./vendor/SplitText.js";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function histAnimations() {
  if (window.matchMedia("(max-width: 640px)").matches) return;
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section[class^='hist-']")
  );

  console.log("Sections", sections);

  sections.forEach((section) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
      },
    });

    const card = section.matches(".js-hist-card")
      ? section
      : section.querySelector(".js-hist-card");

    if (card) {
      tl.from(card, {
        autoAlpha: 0,
        duration: 0.8,
      });
    }

    const imageWrappers = Array.from(
      section.querySelectorAll(".js-hist-image-wrapper")
    );

    imageWrappers.forEach((wrapper) => {
      const image = wrapper.querySelector(".js-hist-image");
      const text = wrapper.querySelector(".js-hist-image-text");

      tl.fromTo(
        image,
        {
          // clipPath: "inset(0 0 100% 0)",
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          // clipPath: "inset(0 0 0% 0)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
        }
      );

      if (text) {
        tl.fromTo(
          text,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.8,
          }
        );
      }
    });

    const histScaleImages = Array.from(
      section.querySelectorAll(".js-hist-scale-image")
    );

    histScaleImages.forEach((image) => {
      tl.fromTo(
        image,
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 3,
          ease: "power2.out",
        }
      );
    });

    const years = Array.from(
      section.querySelectorAll<HTMLElement>(".js-hist-year, .js-hist-heading")
    );
    years.forEach((element) => {
      new SplitText(element, { type: "lines", linesClass: "lineChild" });
      new SplitText(element, { type: "lines", linesClass: "lineParent" });
      const lines = Array.from(element.querySelectorAll(".lineChild"));
      const parentLines = Array.from(element.querySelectorAll(".lineParent"));
      gsap.set(parentLines, {
        overflow: "hidden",
      });

      tl.from(
        lines,
        {
          autoAlpha: 0,
          yPercent: 100,
          stagger: 0,
          duration: 0.8,
        },
        0
      );
    });

    const texts = Array.from(
      section.querySelectorAll<HTMLHeadingElement>(".js-hist-text")
    );

    texts.forEach((element) => {
      new SplitText(element, { type: "lines", linesClass: "lineChild" });

      const lines = Array.from(element.querySelectorAll(".lineChild"));

      tl.from(
        lines,
        {
          autoAlpha: 0,
          yPercent: 50,
          stagger: 0.1,
          duration: 0.4,
        },
        "<"
      );
    });
  });
}
