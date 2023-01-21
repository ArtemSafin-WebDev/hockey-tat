import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
    cssnano({
      preset: "default",
    }),
  ],
};
