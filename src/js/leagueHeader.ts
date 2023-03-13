import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function leagueHeader() {
  const elements = Array.from(document.querySelectorAll(".league-header"));

  elements.forEach((element) => {
    let open = false;
    const btn = element.querySelector(".league-header__more-btn");
    const content = element.querySelector(".league-header__hidden-content");
    const SPEED = 0.3;

    const openAccordion = (element) => {
      gsap.to(element, {
        height: "auto",
        duration: SPEED,
        onComplete: () => ScrollTrigger.refresh(),
      });
    };
    const closeAccordion = (element) => {
      gsap.to(element, {
        height: 0,
        duration: SPEED,
        onComplete: () => ScrollTrigger.refresh(),
      });
    };

    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      if (!open) {
        element.classList.add("content-shown");
        open = true;
        openAccordion(content);
      } else {
        element.classList.remove("content-shown");
        open = false;
        closeAccordion(content);
      }
    });
  });
}
