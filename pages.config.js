import home from "./pages-data/home";
import newsSingle from "./pages-data/newsSingle";
import news from "./pages-data/news";
import veteransCatalog from "./pages-data/veterans";

const pagesConfig = {
  ...home,
  ...newsSingle,
  ...news,
  ...veteransCatalog,
};

export default pagesConfig;
