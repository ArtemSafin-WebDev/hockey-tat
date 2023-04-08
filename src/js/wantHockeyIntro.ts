export default function wantHockeyIntro() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".js-want-hockey-intro")
  );

  elements.forEach((element) => {
    const btns = Array.from(
      element.querySelectorAll<HTMLButtonElement>(
        ".want-hockey__intro-nav-link"
      )
    );
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".want-hockey__intro-tabs-item")
    );

    const setActiveTab = (index: number) => {
      btns.forEach((btn) => btn.classList.remove("active"));
      items.forEach((item) => item.classList.remove("active"));
      btns[index]?.classList.add("active");
      items[index]?.classList.add("active");
    };

    if (items.length) {
      setActiveTab(0);
    }

    btns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveTab(btnIndex);
      });
    });
  });
}
