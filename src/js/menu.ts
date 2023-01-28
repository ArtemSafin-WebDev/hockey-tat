import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function menu() {
  const burger = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );
  const menu = document.querySelector<HTMLDivElement>(".page-header__menu");
  let open = false;

  const openMenu = () => {
    if (open) return;
    document.body.classList.add("menu-open");
    open = true;
    disableBodyScroll(menu);
  };
  const closeMenu = () => {
    if (!open) return;
    document.body.classList.remove("menu-open");
    open = false;
    clearAllBodyScrollLocks();
  };

  burger.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    if (!open) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}

export default menu;
