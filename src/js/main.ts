import "virtual:svg-icons-register";
import "../css/style.css";
import achivements from "./achivements";
import achivementsSlider from "./achivementsSlider";
import calendarSlider from "./calendarSlider";
import equipmentSlider from "./equipmentSlider";
import newsSlider from "./newsSlider";
import quotesSlider from "./quotesSlider";
import search from "./search";
import ticker from "./ticker";

document.addEventListener("DOMContentLoaded", () => {
  equipmentSlider();
  calendarSlider();
  newsSlider();
  achivements();
  achivementsSlider();
  ticker();
  quotesSlider();
  search();
});
