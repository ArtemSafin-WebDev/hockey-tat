import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import pagesConfig from "./pages.config";
import globalContext from "./pages-data/globalContext";

export default {
  base: "/hockey-tat/",
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/icons")],
      symbolId: "[name]",
    }),
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
      helpers: {
        times: (n, block) => {
          var accum = "";
          for (var i = 0; i < n; ++i) accum += block.fn(i);
          return accum;
        },
      },
      context(pagePath) {
        return {
          ...globalContext,
          ...pagesConfig[pagePath],
        };
      },
    }),
  ],
};
