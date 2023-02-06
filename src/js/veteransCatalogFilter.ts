import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

export default function veteransCatalogFilter() {
  const openBtn = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__mobile-filters-btn"
  );
  const closeBtn = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__filters-modal-submit-btn"
  );
  const modal = document.querySelector(".veterans-catalog__filters-modal");
  let open = false;

  const resetBtn = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__filters-modal-reset-btn"
  );

  const inputs = Array.from(
    document.querySelectorAll<HTMLInputElement>(
      ".veterans-catalog__filters-checkbox-input"
    )
  );

  const mobileFiltersBtnText = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__mobile-filters-btn-text"
  );

  const clearSearchBtn = document.querySelector(
    ".veterans-catalog__search-close-btn"
  );

  const setText = () => {
    const checkedInput = inputs.find((input) => input.checked);
    if (checkedInput) {
      const textElement = checkedInput.parentElement?.querySelector(
        ".veterans-catalog__filters-checkbox-text"
      );
      mobileFiltersBtnText.textContent = textElement.textContent;
    }
  };

  const openModal = () => {
    if (open) return;
    modal.classList.add("active");
    disableBodyScroll(modal);
    open = true;
  };

  const closeModal = () => {
    if (!open) return;
    modal.classList.remove("active");
    clearAllBodyScrollLocks();
    open = false;
  };

  if (modal) {
    if (openModal) {
      openBtn.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
      });
    }

    if (closeModal) {
      closeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      setText();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (inputs.length) {
        inputs[0].checked = true;
      }

      setText();

      closeModal();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const input = clearSearchBtn.previousElementSibling as HTMLInputElement;
      if (input) {
        input.value = "";
      }
    });
  }
}
