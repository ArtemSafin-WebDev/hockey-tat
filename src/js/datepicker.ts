import AirDatepicker from "air-datepicker";
// import "air-datepicker/air-datepicker.css";

export default function datepicker() {
  const calendar: HTMLElement = document.querySelector(
    ".news-catalog__filters-calendar-element"
  );

  new AirDatepicker(calendar, {
    inline: true,
  });
}
