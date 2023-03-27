import AirDatepicker from "air-datepicker";

export default function calendar() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".calendar")
  );

  elements.forEach((element) => {
    const calendar = element.querySelector(
      ".calendar__filter-form-field--calendar"
    );

    if (calendar) {
      const form = calendar.closest("form");
      const calendarLabel: HTMLElement = calendar.querySelector(
        ".calendar__filters-calendar-label"
      );

      const calendarRoot: HTMLElement = calendar.querySelector(
        ".calendar__filters-calendar"
      );

      const calendarElement: HTMLInputElement = calendar.querySelector(
        ".calendar__filters-calendar-element"
      );

      const showDateField: HTMLInputElement =
        calendar.querySelector<HTMLInputElement>(
          ".calendar__filters-calendar-input"
        );

      const calendarResetBtn: HTMLButtonElement =
        calendar.querySelector<HTMLButtonElement>(
          ".calendar__filters-calendar-reset"
        );

      const calendarDropdown: HTMLElement = element.querySelector(
        ".calendar__filters-calendar-dropdown"
      );

      const applyBtn: HTMLButtonElement = element.querySelector(
        ".calendar__filters-calendar-apply-btn"
      );
      let calendarOpen = false;

      const openCalendar = () => {
        if (calendarOpen) return;
        calendarLabel.classList.add("active");
        calendarDropdown.classList.add("active");

        if (form) {
          form.classList.add("calendar-open");
        }
        calendarOpen = true;
      };

      const closeCalendar = () => {
        if (!calendarOpen) return;
        calendarLabel.classList.remove("active");
        calendarDropdown.classList.remove("active");

        if (form) {
          form.classList.remove("calendar-open");
        }
        calendarOpen = false;
      };

      let datepicker: AirDatepicker | null = null;

      if (calendarElement) {
        datepicker = new AirDatepicker(calendarElement, {
          inline: true,
          altField: showDateField,
          altFieldDateFormat: "dd.MM.yyyy",
          dateFormat: "dd.MM.yyyy",
          range: true,
          multipleDatesSeparator: " - ",
        });
      }

      if (datepicker && calendarLabel && calendarRoot) {
        calendarLabel.addEventListener("click", (event) => {
          event.preventDefault();
          if (!calendarOpen) {
            openCalendar();
          } else {
            closeCalendar();
          }
        });
      }

      if (calendarResetBtn) {
        calendarResetBtn.addEventListener("click", (event) => {
          event.preventDefault();
          if (datepicker) {
            // @ts-ignore
            datepicker.clear({
              silent: true,
            });
          }

          setTimeout(() => {
            showDateField.value = "За все время";

            closeCalendar();
          }, 50);
        });
      }

      if (applyBtn) {
        applyBtn.addEventListener("click", (event) => {
          event.preventDefault();
          closeCalendar();
        });
      }
    }

    const tabsNav = Array.from(
      element.querySelectorAll<HTMLLinkElement>(".calendar__tabs-nav-link")
    );
    const tabItems = Array.from(
      element.querySelectorAll<HTMLElement>(".calendar__tabs-item")
    );

    const setActiveTab = (index: number) => {
      tabsNav.forEach((item) => item.classList.remove("active"));
      tabItems.forEach((item) => item.classList.remove("active"));

      tabsNav[index]?.classList.add("active");
      tabItems[index]?.classList.add("active");
    };

    tabsNav.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        setActiveTab(btnIndex);
      });
    });

    if (tabsNav.length) {
      tabsNav[0]?.click();
    }

    const selects = Array.from(element.querySelectorAll(".calendar__select"));

    selects.forEach((select) => {
      const btn = select.querySelector(".calendar__select-btn");
      const btnText = select.querySelector(".calendar__select-btn-text");
      const dropdown = select.querySelector(".calendar__select-dropdown");
      const radios: HTMLInputElement[] = Array.from(
        select.querySelectorAll(".calendar__select-checkbox-input")
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
  });
}
