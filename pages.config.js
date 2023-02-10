import home from "./pages-data/home";
import newsSingle from "./pages-data/newsSingle";
import news from "./pages-data/news";
import veteransCatalog from "./pages-data/veterans";
import veteransDetail from "./pages-data/veteranDetail";

const pagesConfig = {
  ...home,
  ...newsSingle,
  ...news,
  ...veteransCatalog,
  ...veteransDetail,
};

export default pagesConfig;
