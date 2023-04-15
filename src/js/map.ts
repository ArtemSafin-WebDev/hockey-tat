export default function map() {
  const elements: HTMLElement[] = Array.from(document.querySelectorAll(".map"));

  elements.forEach((element) => {
    const form = element.querySelector<HTMLFormElement>("form");
    const toggleBtn = element.querySelector<HTMLButtonElement>(
      ".map__filters-toggle-btn"
    );
    const closeBtn = element.querySelector<HTMLButtonElement>(
      ".map__filters-panel-close"
    );

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const insideSelect =
        target.matches(".map__filters-select") ||
        target.closest(".map__filters-select");
      if (!insideSelect) {
        const dropdowns = Array.from(
          document.querySelectorAll(".map__filters-select-dropdown")
        );
        const btns = Array.from(
          document.querySelectorAll(".map__filters-select-btn")
        );
        dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
        btns.forEach((btn) => btn.classList.remove("active"));
        return;
      }

      const select = target.matches(".map__filters-select")
        ? target
        : target.closest(".map__filters-select");
      const btn = select.querySelector(".map__filters-select-btn");
      const dropdown = select.querySelector(".map__filters-select-dropdown");
      const clickInsideBtn = btn.contains(target);

      const selects = Array.from(
        document.querySelectorAll(".map__filters-select")
      );

      selects.forEach((otherSelect) => {
        if (otherSelect !== select) {
          const btn = otherSelect.querySelector(".map__filters-select-btn");
          const dropdown = otherSelect.querySelector(
            ".map__filters-select-dropdown"
          );
          btn.classList.remove("active");
          dropdown.classList.remove("active");
        }
      });

      if (clickInsideBtn) {
        dropdown.classList.toggle("active");
        btn.classList.toggle("active");
      }
    });

    form.addEventListener("reset", () => {
      const selects = Array.from(form.querySelectorAll(".map__filters-select"));
      selects.forEach((select) => {
        const btn = select.querySelector(".map__filters-select-btn");
        const btnText = select.querySelector(".map__filters-select-btn-text");
        const placeholderText = btn.getAttribute("data-placeholder-text");
        const dropdown = select.querySelector(".map__filters-select-dropdown");
        const radios: HTMLInputElement[] = Array.from(
          select.querySelectorAll(".map__filters-select-checkbox-input")
        );

        radios.forEach((radio) => (radio.checked = false));
        btnText.textContent = placeholderText;
        btn.classList.remove("active");
        dropdown.classList.remove("active");
      });
    });

    form.addEventListener("change", (event: InputEvent) => {
      const target = event.target as HTMLInputElement;
      if (target.matches(".map__filters-select-checkbox-input")) {
        const select = target.closest(".map__filters-select");
        const radios: HTMLInputElement[] = Array.from(
          select.querySelectorAll(".map__filters-select-checkbox-input")
        );
        const btn = select.querySelector(".map__filters-select-btn");
        const btnText = select.querySelector(".map__filters-select-btn-text");
        const dropdown = select.querySelector(".map__filters-select-dropdown");

        const checkedRadio = radios.find((radio) => radio.checked === true);
        if (!checkedRadio) return;
        const textValueElement = checkedRadio.nextElementSibling;
        if (!textValueElement) return;

        btnText.textContent = textValueElement.textContent;

        dropdown.classList.remove("active");
        btn.classList.remove("active");
      }
    });

    toggleBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      document.body.classList.toggle("filters-open");
    });

    closeBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      document.body.classList.remove("filters-open");
    });
  });
}
