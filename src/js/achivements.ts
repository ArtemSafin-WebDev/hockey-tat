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

        document.dispatchEvent(
          new CustomEvent("tabclick", {
            detail: {
              tab: leaguesTabsItems[index],
            },
          })
        );
      });
    });

    if (activeLeague) {
      activeLeague.click();
    } else {
      leaguesTabsLinks[0]?.click();
    }
  });
}

export default achivements;
