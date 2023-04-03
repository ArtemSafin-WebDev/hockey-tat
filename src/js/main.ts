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
import select from "./select";
import newsCatalogFilters from "./newsCatalogFilters";
import veteransHeaderSlider from "./veteransHeaderSlider";
import veteransCatalogFilter from "./veteransCatalogFilter";
import checkScroll from "./checkScroll";
import veteransDetail from "./veteransDetail";
import fancybox from "./fancybox";
import counters from "./counters";
import schoolSelect from "./schoolSelect";
import leagueHeader from "./leagueHeader";
import leagueTournaments from "./leagueTournaments";
import leagueMatches from "./leagueMatches";
import calendar from "./calendar";
import adaptiveTeamsSlider from "./adaptiveTeamsSlider";
import adaptiveStagesSlider from "./adaptiveStagesSlider";
import adaptiveStagesShowMore from "./adaptiveStagesShowMore";
import validation from "./validation";
import adaptiveFormCalendar from "./adaptiveFormCalendar";

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
  select();
  newsCatalogFilters();
  veteransHeaderSlider();
  veteransCatalogFilter();
  checkScroll();
  veteransDetail();
  fancybox();
  counters();
  schoolSelect();
  leagueHeader();
  leagueTournaments();
  leagueMatches();
  calendar();
  adaptiveTeamsSlider();
  adaptiveStagesSlider();
  adaptiveStagesShowMore();
  validation();
  adaptiveFormCalendar();
});
