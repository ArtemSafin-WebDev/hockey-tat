import home from "./pages-data/home";
import newsSingle from "./pages-data/newsSingle";
import news from "./pages-data/news";
import veteransCatalog from "./pages-data/veterans";
import veteransDetail from "./pages-data/veteranDetail";
import vospit from "./pages-data/vospit";
import vospitDetail from "./pages-data/vospitDetail";
import judges from "./pages-data/judges";
import judgeDetail from "./pages-data/judgeDetail";
import trainers from "./pages-data/trainers";
import trainerDetail from "./pages-data/trainerDetail";
import school from "./pages-data/school";
import league from "./pages-data/league";

const pagesConfig = {
  ...home,
  ...newsSingle,
  ...news,
  ...veteransCatalog,
  ...veteransDetail,
  ...vospit,
  ...vospitDetail,
  ...judges,
  ...judgeDetail,
  ...trainers,
  ...trainerDetail,
  ...school,
  ...league,
};

export default pagesConfig;
