function achivements(selector: string = ".js-achivements"): void {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(selector)
  );

  elements.forEach((element) => {
    const leaguesTabsLinks: HTMLLinkElement[] = Array.from(
      element.querySelectorAll(".achivements__leagues-tabs-nav-link")
    );
    const leaguesTabsItems: HTMLDivElement[] = Array.from(
      element.querySelectorAll(".achivements__leagues-tabs-item")
    );
    const activeLeague = leaguesTabsLinks.find((link) =>
      link.classList.contains("active")
    );

    leaguesTabsLinks.forEach((link, index) => {
      link.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        leaguesTabsLinks.forEach((link) => link.classList.remove("active"));
        leaguesTabsItems.forEach((tab) => tab.classList.remove("active"));
        leaguesTabsLinks[index]?.classList.add("active");
        leaguesTabsItems[index]?.classList.add("active");
      });
    });

    if (activeLeague) {
      activeLeague.click();
    } else {
      leaguesTabsLinks[0]?.click();
    }

    leaguesTabsItems.forEach((tabItem) => {
      const innerTabs: HTMLDivElement[] = Array.from(
        tabItem.querySelectorAll(".achivements__leagues-inner-tab")
      );
      const selectors = Array.from(
        tabItem.querySelectorAll(
          ".achivements__leagues-team-slider-card-selector"
        )
      );

      selectors.forEach((selector) => {
        const btn = selector.querySelector<HTMLButtonElement>(
          ".achivements__leagues-team-slider-card-selector-btn"
        );

        const links = Array.from(
          selector.querySelectorAll(
            ".achivements__leagues-team-slider-card-selector-link"
          )
        );

        btn.addEventListener("click", (event: MouseEvent) => {
          event.preventDefault();
          selector.classList.toggle("active");
        });

        links.forEach((link, linkIndex) => {
          link.addEventListener("click", (event: MouseEvent) => {
            event.preventDefault();

            innerTabs.forEach((tab) => tab.classList.remove("active"));
            innerTabs[linkIndex].classList.add("active");

            selectors.forEach((selector) => {
              const links = Array.from(
                selector.querySelectorAll(
                  ".achivements__leagues-team-slider-card-selector-link"
                )
              );

              const btnText = selector.querySelector(
                ".achivements__leagues-team-slider-card-selector-btn-text"
              );

              btnText.textContent = link.textContent;
              selector.classList.remove("active");

              links.forEach((link) => link.classList.remove("active"));
              links[linkIndex]?.classList.add("active");
            });
          });
        });
      });

      if (innerTabs.length) {
        innerTabs[0]
          ?.querySelector(".achivements__leagues-team-slider-card-selector")
          ?.querySelectorAll<HTMLLinkElement>(
            ".achivements__leagues-team-slider-card-selector-link"
          )[0]
          ?.click();
      }
    });
  });
}

export default achivements;
