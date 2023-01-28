import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function footerSubmenu() {
  const SPEED = 0.6;
  const ROOT_SELECTOR = ".page-footer__nav-list-item--has-submenu";
  const BTN_SELECTOR = ".page-footer__nav-link";
  const CONTENT_SELECTOR = ".page-footer__nav-submenu";

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

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches(BTN_SELECTOR) || target.closest(BTN_SELECTOR)) {
      const btn = target.matches(BTN_SELECTOR)
        ? target
        : target.closest(BTN_SELECTOR);
      const element = btn.closest(ROOT_SELECTOR);
      const content = element.querySelector(CONTENT_SELECTOR);
      const elements = Array.from(document.querySelectorAll(ROOT_SELECTOR));

      if (!content) {
        return;
      }

      event.preventDefault();

      if (element.hasAttribute("data-close-other")) {
        elements.forEach((otherElement) => {
          if (otherElement !== element) {
            if (otherElement.classList.contains("active")) {
              const content = otherElement.querySelector(CONTENT_SELECTOR);
              closeAccordion(content);
              otherElement.classList.remove("active");
            }
          }
        });
      }

      if (element.classList.contains("active")) {
        closeAccordion(content);
      } else {
        openAccordion(content);
      }
      element.classList.toggle("active");
    }
  });
}
