import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

export default function veteransCatalogFilter() {
  const openBtn = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__mobile-filters-btn"
  );
  const closeBtn = document.querySelector<HTMLButtonElement>(
    ".veterans-catalog__filters-modal-close-btn"
  );
  const modal = document.querySelector(".veterans-catalog__filters-modal");
  let open = false;

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

  if (openBtn && closeBtn && modal) {
    console.log("Hello there");
    openBtn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      closeModal();
    });
  }
}
