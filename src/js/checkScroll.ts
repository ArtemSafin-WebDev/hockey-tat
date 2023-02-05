export default function checkScroll() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".js-check-scroll")
  );

  elements.forEach((element) => {
    const parent = element.parentElement;
    const check = () => {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const offsetHeight = element.offsetHeight;

      parent.classList.remove("reached-start");
      parent.classList.remove("reached-end");

      if (offsetHeight === scrollHeight) {
        parent.classList.add("reached-start");
        parent.classList.add("reached-end");
        return;
      }

      if (scrollTop === 0) {
        parent.classList.add("reached-start");
      }

      if (scrollTop + offsetHeight === scrollHeight) {
        parent.classList.add("reached-end");
      }
      console.dir({
        scrollTop,
        scrollHeight,
        offsetHeight,
      });
    };

    check();

    element.addEventListener("scroll", check);

    const resizeObserver = new ResizeObserver(() => {
      check();
    });

    resizeObserver.observe(element);
  });
}
