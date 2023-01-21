function ticker(
  selector: string = ".js-ticker",
  childSelector = ".js-ticker-inner"
) {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const innerTicker = element.querySelector<HTMLDivElement>(childSelector);

    if (innerTicker) {
      const clone = innerTicker.cloneNode(true);
      const parent = innerTicker.parentElement;
      if (parent) {
        parent.append(clone);
      }
    }
  });
}

export default ticker;
