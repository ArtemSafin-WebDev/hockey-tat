function search(
  openBtnSelector: string = ".js-search-btn",
  closeBtnSelector: string = ".js-search-close",
  modalSelector: string = ".js-search-modal"
): void {
  const openBtn = document.querySelector<HTMLButtonElement>(openBtnSelector);
  const closeBtn = document.querySelector<HTMLButtonElement>(closeBtnSelector);
  const modal = document.querySelector<HTMLDivElement>(modalSelector);

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      openBtn.classList.add("active");
      modal.classList.add("active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      openBtn.classList.remove("active");
      modal.classList.remove("active");
    });
  }
}

export default search;
