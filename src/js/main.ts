import "virtual:svg-icons-register";
import achivements from "./achivements";
import achivementsCardSlider from "./achivementsCardSlider";
import achivementsSlider from "./achivementsSlider";
import calendarSlider from "./calendarSlider";
import equipmentSlider from "./equipmentSlider";
import footerSubmenu from "./footerSubmenu";
import headerSubmenu from "./headerSubmenu";
import menu from "./menu";
import newsSlider from "./newsSlider";
import quotesSlider from "./quotesSlider";
import search from "./search";
import ticker from "./ticker";
import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  equipmentSlider();
  calendarSlider();
  newsSlider();
  achivements();
  achivementsSlider();
  ticker();
  quotesSlider();
  search();
  footerSubmenu();
  headerSubmenu();
  menu();
  achivementsCardSlider();
});
