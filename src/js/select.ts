export default function select() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".select")
  );

  elements.forEach((element) => {
    let isOpen: boolean = false;
    const btn = element.querySelector<HTMLButtonElement>("button");
    const btnText: HTMLElement = btn.querySelector(".select__btn-text");
    const dropdown = element.querySelector<HTMLDivElement>(".select__dropdown");
    const inputs = Array.from(
      element.querySelectorAll<HTMLInputElement>('input[type="radio"]')
    );

    const openSelect = () => {
      if (isOpen) return;
      btn.classList.add("active");
      dropdown.classList.add("active");

      isOpen = true;
    };

    const closeSelect = () => {
      if (!isOpen) return;
      btn.classList.remove("active");
      dropdown.classList.remove("active");

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
        closeSelect();
      }
    };

    btn.addEventListener("click", handleBtnClick);

    inputs.forEach((input) => input.addEventListener("change", handleSelected));

    document.addEventListener("click", (event: MouseEvent) => {
      const { target } = event;
      if (element.contains(target as HTMLElement)) return;
      closeSelect();
    });
  });
}
