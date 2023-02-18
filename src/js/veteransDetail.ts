import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function veteransDetail() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".veterans-detail")
  );

  elements.forEach((element) => {
    const links = Array.from(
      element.querySelectorAll(".veterans-detail__nav-link")
    );
    const tabs = Array.from(
      element.querySelectorAll(".veterans-detail__tabs-item")
    );

    if (!links.length || !tabs.length) return;

    const tabsContainer = element.querySelector(".veterans-detail__tabs");

    const setActive = (index: number) => {
      const state = Flip.getState(tabsContainer);
      links.forEach((link) => link.classList.remove("active"));
      links[index]?.classList.add("active");
      tabs.forEach((tab) => tab.classList.remove("active"));
      tabs[index]?.classList.add("active");

      Flip.from(state, {
        ease: "power1.inOut",
        duration: 0.4,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    };

    links.forEach((link, linkIndex) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(linkIndex);
      });
    });
  });
}
