import AirDatepicker from "air-datepicker";
import { parse } from "date-fns";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function calendar() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".calendar")
  );

  elements.forEach((element) => {
    const tabsNavLinks: HTMLElement[] = Array.from(
      element.querySelectorAll(".calendar__tabs-nav-link")
    );
    const activeLink = tabsNavLinks.find((link) =>
      link.classList.contains("active")
    );
    if (activeLink) {
      gsap.to(activeLink.parentElement.parentElement, {
        duration: 0,
        ease: "none",
        scrollTo: {
          x: activeLink,
          autoKill: false,
        },
      });
    }

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

      let activeDate = new Date();

      if (showDateField.value.trim()) {
        try {
          const parsedDate = parse(
            showDateField.value.trim(),
            "dd.MM.yyyy",
            new Date()
          );

          console.log("Parsed date");

          activeDate = parsedDate;
        } catch (err) {
          console.error(err);
        }
      }

      if (calendarElement) {
        datepicker = new AirDatepicker(calendarElement, {
          inline: true,
          altField: showDateField,
          altFieldDateFormat: "dd.MM.yyyy",
          dateFormat: "dd.MM.yyyy",
          range: false,
          multipleDatesSeparator: " - ",
          startDate: activeDate,
          selectedDates: [activeDate],
          onSelect: () => {
            closeCalendar();
          },
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
