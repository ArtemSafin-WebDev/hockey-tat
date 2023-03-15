import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const openElement = (element) => {
  gsap.to(element, {
    height: "auto",
    duration: 0.4,
    onComplete: () => ScrollTrigger.refresh(),
  });
};
const closeElement = (element) => {
  gsap.to(element, {
    height: 0,
    duration: 0.4,
    onComplete: () => ScrollTrigger.refresh(),
  });
};

export default function leagueMatches() {
  const elements = Array.from(document.querySelectorAll(".league-matches"));

  elements.forEach((element) => {
    const selects = Array.from(
      element.querySelectorAll(".league-matches__select")
    );

    const teams = Array.from(
      element.querySelectorAll(".league-matches__teams")
    );

    const tabsNav = Array.from(
      element.querySelectorAll(".league-matches__tabs-nav-link")
    );

    const tabItems = Array.from(
      element.querySelectorAll(".league-matches__tabs-item")
    );

    const glossaries = Array.from(
      element.querySelectorAll(".league-matches__glossary")
    );

    const innerTabsNavSelectBtn = element.querySelector(
      ".league-matches__inner-tabs-nav-btn"
    );

    const innerTabsNavSelectBtnText = element.querySelector(
      ".league-matches__inner-tabs-nav-btn-text"
    );

    const innerNavTabsDropdown = element.querySelector(
      ".league-matches__inner-tabs-nav-dropdown"
    );

    const innerTabsNav = element.querySelector(
      ".league-matches__inner-tabs-nav"
    );

    const innerTabsNavBtns = Array.from(
      element.querySelectorAll(".league-matches__inner-tabs-nav-dropdown-link")
    );

    const innerTabsItems = Array.from(
      element.querySelectorAll(".league-matches__inner-tabs-item")
    );

    const setActiveTabItem = (index) => {
      tabsNav.forEach((item) => item.classList.remove("active"));
      tabItems.forEach((item) => item.classList.remove("active"));

      tabsNav[index]?.classList.add("active");
      tabItems[index]?.classList.add("active");
    };

    const activeTabsIndex = tabsNav.findIndex((btn) =>
      btn.classList.contains("active")
    );

    if (tabItems.length) {
      if (activeTabsIndex === -1) {
        setActiveTabItem(activeTabsIndex);
      } else {
        setActiveTabItem(0);
      }
    }

    const setActiveInnerTabItem = (index) => {
      innerTabsNavBtns.forEach((btn) => btn.classList.remove("active"));
      innerTabsItems.forEach((item) => item.classList.remove("active"));

      innerTabsNavBtns[index]?.classList.add("active");
      innerTabsItems[index]?.classList.add("active");

      const activeLink = innerTabsNavBtns[index];

      innerTabsNavSelectBtnText.textContent = activeLink.textContent;

      innerNavTabsDropdown.classList.remove("active");
      innerTabsNavSelectBtn.classList.remove("active");
    };

    if (innerTabsNavSelectBtn) {
      innerTabsNavSelectBtn.addEventListener("click", (event) => {
        event.preventDefault();

        innerTabsNavSelectBtn.classList.toggle("active");
        innerNavTabsDropdown.classList.toggle("active");
      });

      innerTabsNavBtns.forEach((btn, btnIndex) => {
        btn.addEventListener("click", (event) => {
          event.preventDefault();

          setActiveInnerTabItem(btnIndex);
        });
      });

      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if (innerTabsNav.contains(target)) return;

        innerTabsNavSelectBtn.classList.remove("active");
        innerNavTabsDropdown.classList.remove("active");
      });
    }

    if (innerTabsItems.length) {
      const activeInnerTabIndex = innerTabsNavBtns.findIndex((btn) =>
        btn.classList.contains("active")
      );

      if (activeInnerTabIndex === -1) {
        setActiveInnerTabItem(0);
      } else {
        setActiveInnerTabItem(activeInnerTabIndex);
      }
    }

    selects.forEach((select) => {
      const btn = select.querySelector(".league-matches__select-btn");
      const btnText = select.querySelector(".league-matches__select-btn-text");
      const dropdown = select.querySelector(".league-matches__select-dropdown");
      const radios: HTMLInputElement[] = Array.from(
        select.querySelectorAll(".league-matches__select-checkbox-input")
      );

      const setActiveRadio = () => {
        const checkedRadio = radios.find((radio) => radio.checked === true);
        if (!checkedRadio) return;
        const textValueElement = checkedRadio.nextElementSibling;
        if (!textValueElement) return;

        btnText.textContent = textValueElement.textContent;

        dropdown.classList.remove("active");
        btn.classList.remove("active");
      };

      const initiallyChecked = radios.find((radio) => radio.checked === true);
      if (!initiallyChecked && radios.length) {
        radios[0].checked = true;
      }

      setActiveRadio();

      btn.addEventListener("click", (event) => {
        event.preventDefault();
        dropdown.classList.toggle("active");
        btn.classList.toggle("active");
      });

      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if (select.contains(target)) return;
        dropdown.classList.remove("active");
        btn.classList.remove("active");
      });

      radios.forEach((radio) => {
        radio.addEventListener("change", () => {
          setActiveRadio();
        });
      });
    });

    teams.forEach((team) => {
      const btn = team.querySelector(".league-matches__teams-show");
      const content = team.querySelector(".league-matches__teams-content");

      btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (btn.classList.contains("active")) {
          closeElement(content);
          btn.classList.remove("active");
        } else {
          openElement(content);
          btn.classList.add("active");
        }
      });
    });

    tabsNav.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        setActiveTabItem(btnIndex);
      });
    });

    glossaries.forEach((glossary) => {
      const btn = glossary.querySelector(".league-matches__glossary-open");
      const content = glossary.querySelector(
        ".league-matches__glossary-content"
      );

      btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (!btn.classList.contains("active")) {
          openElement(content);
          btn.classList.add("active");
        } else {
          closeElement(content);
          btn.classList.remove("active");
        }
      });
    });
  });
}
