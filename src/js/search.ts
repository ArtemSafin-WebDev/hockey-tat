import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function search(
  openBtnSelector: string = ".js-search-btn, .page-header__mobile-search-btn",
  closeBtnSelector: string = ".js-search-close",
  modalSelector: string = ".js-search-modal"
): void {
  const openBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>(openBtnSelector)
  );
  const closeBtn = document.querySelector<HTMLButtonElement | HTMLLinkElement>(
    closeBtnSelector
  );
  const modal = document.querySelector<HTMLDivElement>(modalSelector);

  if (!modal) return;

  openBtns.forEach((openBtn) => {
    openBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      openBtn.classList.add("active");
      modal.classList.add("active");
      disableBodyScroll(modal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();

      openBtns.forEach((openBtn) => {
        openBtn.classList.remove("active");
      });

      modal.classList.remove("active");

      clearAllBodyScrollLocks();
    });
  }
}

export default search;
