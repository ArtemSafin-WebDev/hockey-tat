export default function adaptiveStagesShowMore() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".adaptive-stages__show-more")
  );

  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      element.closest(".adaptive-stages__slider")?.classList.add("show-all");
    });
  });
}
