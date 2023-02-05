export default function select() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".select")
  );

  elements.forEach((element) => {
    let isOpen: boolean = false;
    const btn = element.querySelector<HTMLButtonElement>("button");
    const btnText: HTMLElement = btn.querySelector(".select__btn-text");
    const dropdown = element.querySelector<HTMLDivElement>(".select__dropdown");
    const notCloseOnMobile = element.hasAttribute(
      "data-do-not-close-on-mobile"
    );
    const inputs = Array.from(
      element.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    );
    const form = element.closest("form");
    const selectName = element.getAttribute("data-select-name");
    const selectCloseBtns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(".js-select-close-btn")
    );
    const placeholder = element.getAttribute("data-placeholder");

    const openSelect = () => {
      if (isOpen) return;
      btn.classList.add("active");
      dropdown.classList.add("active");

      if (form && selectName) {
        form.classList.add(`${selectName}-open`);
      }

      isOpen = true;
    };

    const closeSelect = () => {
      if (!isOpen) return;
      btn.classList.remove("active");
      dropdown.classList.remove("active");

      if (form && selectName) {
        form.classList.remove(`${selectName}-open`);
      }

      isOpen = false;
    };

    const handleBtnClick = (event: MouseEvent) => {
      event.preventDefault();
      if (isOpen) {
        closeSelect();
      } else {
        openSelect();
      }
    };

    const handleSelected = () => {
      const selectedInput = inputs.find((input) => input.checked);
      if (selectedInput) {
        const valueText = selectedInput.parentElement?.querySelector(
          ".select__radio-text"
        )?.textContent;
        if (btnText) {
          btnText.textContent = valueText;
        }

        if (notCloseOnMobile && window.matchMedia("(max-width: 640px)").matches)
          return;

        closeSelect();
      }
    };

    btn.addEventListener("click", handleBtnClick);

    inputs.forEach((input) => input.addEventListener("change", handleSelected));

    document.addEventListener("click", (event: MouseEvent) => {
      const { target } = event;
      if (element.contains(target as HTMLElement)) return;
      if (notCloseOnMobile && window.matchMedia("(max-width: 640px)").matches)
        return;

      closeSelect();
    });

    selectCloseBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        closeSelect();
      });
    });

    form.addEventListener("reset", () => {
      inputs.forEach((input) => (input.checked = false));
      btnText.textContent = placeholder;
    });

    handleSelected();
  });
}
