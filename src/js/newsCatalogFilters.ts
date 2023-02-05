import AirDatepicker from "air-datepicker";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Hammer from "hammerjs";
// import "air-datepicker/air-datepicker.css";

export default function newsCatalogFilters() {
  const elements: HTMLElement[] = Array.from(
    document.querySelectorAll(".news-catalog__filters")
  );

  elements.forEach((element) => {
    const calendarRoot = element.querySelector(
      ".news-catalog__filters-calendar"
    );

    const searchClose = element.querySelector<HTMLButtonElement>(
      ".news-catalog__filters-search-close-btn"
    );

    const calendarLabel = element.querySelector(
      ".news-catalog__filters-calendar-label"
    );
    const calendar = element.querySelector<HTMLInputElement>(
      ".news-catalog__filters-calendar-element"
    );

    const showDateField = element.querySelector<HTMLInputElement>(
      ".news-catalog__filters-calendar-input"
    );

    const datePresets = Array.from(
      element.querySelectorAll<HTMLInputElement>(
        ".news-catalog__filters-calendar-checkbox-input"
      )
    );

    const calendarResetBtn = element.querySelector<HTMLButtonElement>(
      ".news-catalog__filters-calendar-reset"
    );

    const allPreset = element.querySelector<HTMLInputElement>(
      ".news-catalog__filters-calendar-checkbox-all"
    );

    const calendarDropdown: HTMLElement = element.querySelector(
      ".news-catalog__filters-calendar-dropdown"
    );

    const applyBtn = element.querySelector(
      ".news-catalog__filters-calendar-apply-btn"
    );

    let isModalOpen = false;
    const filtersModal = element.querySelector<HTMLDivElement>(
      ".news-catalog__filters-mobile-filters-modal"
    );

    const filtersModalOpenBtn = element.querySelector<HTMLButtonElement>(
      ".news-catalog__filters-mobile-filters-open-btn"
    );
    const filtersModalCloseBtn = element.querySelector<HTMLButtonElement>(
      ".news-catalog__filters-mobile-filters-modal-close"
    );

    const openModal = () => {
      if (isModalOpen) return;
      disableBodyScroll(filtersModal);
      filtersModal.classList.add("active");

      isModalOpen = true;
    };

    const closeModal = () => {
      if (!isModalOpen) return;
      clearAllBodyScrollLocks();
      filtersModal.classList.remove("active");

      isModalOpen = false;
    };

    if (filtersModalOpenBtn) {
      filtersModalOpenBtn.addEventListener("click", (event) => {
        event.preventDefault();
        openModal();
      });
    }

    if (filtersModalCloseBtn) {
      filtersModalCloseBtn.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
      });
    }

    const form = element.querySelector("form");

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

    if (calendar) {
      datepicker = new AirDatepicker(calendar, {
        inline: true,
        altField: showDateField,
        altFieldDateFormat: "dd.MM.yyyy",
        dateFormat: "dd.MM.yyyy",
        range: true,
        multipleDatesSeparator: " - ",
        onSelect: () => {
          datePresets.forEach((input) => (input.checked = false));
        },
      });
    }

    datePresets.forEach((input) => {
      input.addEventListener("change", () => {
        const checkedPreset = datePresets.find((input) => input.checked);
        if (datepicker) {
          // @ts-ignore
          datepicker.clear({
            silent: true,
          });
        }

        if (checkedPreset) {
          console.log(
            "nextSibling",
            checkedPreset.nextElementSibling?.textContent
          );
          const textValue = checkedPreset.nextElementSibling?.textContent;
          setTimeout(() => {
            showDateField.value = textValue.trim();
          }, 20);
        }
      });
    });

    if (datepicker && calendarLabel && calendarRoot) {
      calendarLabel.addEventListener("click", (event) => {
        event.preventDefault();
        if (!calendarOpen) {
          openCalendar();
        } else {
          closeCalendar();
        }
      });

      document.addEventListener("click", (event) => {
        if (window.matchMedia("(max-width: 640px)").matches) return;
        const { target } = event;
        if (calendarRoot.contains(target as HTMLElement)) {
          return;
        }
        closeCalendar();
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
        if (allPreset) {
          allPreset.checked = true;
          const textValue = allPreset.nextElementSibling?.textContent;
          setTimeout(() => {
            showDateField.value = textValue.trim();
          }, 20);
        }
      });
    }

    if (form) {
      form.addEventListener("reset", () => {
        if (datepicker) {
          // @ts-ignore
          datepicker.clear({
            silent: true,
          });
        }
        if (allPreset) {
          allPreset.checked = true;
          const textValue = allPreset.nextElementSibling?.textContent;
          setTimeout(() => {
            showDateField.value = textValue.trim();
          }, 20);
        }
      });
    }

    const mc = new Hammer(filtersModal);
    mc.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    mc.on("swipedown", function () {
      if (window.matchMedia("(max-width: 640px)").matches) {
        closeCalendar();
      }
    });

    if (applyBtn) {
      applyBtn.addEventListener("click", (event) => {
        event.preventDefault();
        closeCalendar();
      });
    }

    if (searchClose) {
      searchClose.addEventListener("click", (event) => {
        event.preventDefault();
        const input =
          searchClose.previousElementSibling as HTMLInputElement | null;
        if (input) {
          input.value = "";
        }
      });
    }
  });
}
