import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { Plugin } from "rollup";
import postcss from "rollup-plugin-postcss";
import { EchoBundleOptions } from "../tools/build/build";

export function uiPlugins(options: Partial<EchoBundleOptions>): Plugin[] {
  return [
    postcss({
      modules: true,
      minimize: true,
      exclude: "src/theme/theme.css",
    }),
    postcss({
      extract: true,
      modules: false,
      minimize: true,
      include: "src/theme/theme.css",
      exclude: " /.module.css$/",
    }),
    url(),
    svgr(),
  ];
}
