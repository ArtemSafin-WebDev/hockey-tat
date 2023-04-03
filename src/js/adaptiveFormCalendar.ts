import AirDatepicker from "air-datepicker";

export default function adaptiveFormCalendar() {
  const elements: HTMLInputElement[] = Array.from(
    document.querySelectorAll(".js-calendar-field")
  );

  elements.forEach((element) => {
    const form = element.closest("form");

    const calendarElement: HTMLInputElement = element.querySelector(
      ".adaptive-consultation__calendar-dropdown-element"
    );

    const showDateField: HTMLInputElement =
      element.querySelector<HTMLInputElement>(
        ".adaptive-consultation__form-input"
      );

    const calendarDropdown: HTMLElement = element.querySelector(
      ".adaptive-consultation__calendar-dropdown"
    );

    let calendarOpen = false;

    const openCalendar = () => {
      if (calendarOpen) return;

      calendarDropdown.classList.add("active");

      if (form) {
        form.classList.add("calendar-open");
      }
      calendarOpen = true;
    };

    const closeCalendar = () => {
      if (!calendarOpen) return;
      calendarDropdown.classList.remove("active");

      if (form) {
        form.classList.remove("calendar-open");
      }
      calendarOpen = false;
    };

    let activeDate = new Date();

    if (calendarElement) {
      new AirDatepicker(calendarElement, {
        inline: true,
        altField: showDateField,
        altFieldDateFormat: "dd.MM.yyyy",
        dateFormat: "dd.MM.yyyy",
        range: false,
        multipleDatesSeparator: " - ",
        startDate: activeDate,
        onSelect: () => {
          closeCalendar();

          showDateField.dispatchEvent(new Event("input", { bubbles: true }));
        },
      });
    }

    showDateField.addEventListener("click", (event) => {
      event.preventDefault();
      if (!calendarOpen) {
        openCalendar();
      } else {
        closeCalendar();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (element.contains(target)) return;
      closeCalendar();
    });
  });
}
