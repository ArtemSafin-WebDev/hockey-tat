import {
  disableBodyScroll as lockScroll,
  clearAllBodyScrollLocks as unlockScroll,
} from "body-scroll-lock";

export default function modals() {
  let activeModal = null;

  function openModal(id, event) {
    const modal = document.querySelector(`.js-modal${id}`);
    if (!modal) {
      return;
    }

    if (event) {
      event.preventDefault();
    }

    console.log("Opening modal", modal);

    const openHandler = () => {
      lockScroll(modal, {
        reserveScrollBarGap: true,
      });
      modal.classList.add("active");
      document.body.classList.add("modal-open");
      activeModal = modal;

      const openModalEvent = new CustomEvent("openmodal");
      document.dispatchEvent(openModalEvent);
    };
    if (activeModal) {
      closeModal(activeModal);

      setTimeout(() => {
        openHandler();
      }, 400);
    } else {
      openHandler();
    }
  }

  function closeModal(modal) {
    document.body.classList.remove("modal-open");
    unlockScroll();

    modal.classList.remove("active");

    activeModal = null;

    const closeModalEvent = new CustomEvent("closemodal");
    document.dispatchEvent(closeModalEvent);
  }

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches("a") || target.closest("a")) {
      const link = target.matches("a") ? target : target.closest("a");

      //@ts-ignore
      const hash = link.hash;
      if (!hash) return;
      openModal(hash, event);
    } else if (
      target.matches(".js-close-modal") ||
      target.closest(".js-close-modal")
    ) {
      event.preventDefault();
      const modalToClose = target.closest(".js-modal");
      closeModal(modalToClose);
    } else if (target.matches(".js-modal")) {
      event.preventDefault();
      const modalToClose = event.target;
      closeModal(modalToClose);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.which === 27 && activeModal) {
      closeModal(activeModal);
    }
  });
}
