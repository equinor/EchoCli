import { Plugin } from "rollup";
import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript2 from "rollup-plugin-typescript2";
import workerLoader from "rollup-plugin-web-worker-loader";
import { EchoBundleOptions } from "../tools/build/build";
import { babelConfig } from "./babel";
import { productionConfig } from "./poductionConfig";
import { serverConfig } from "./serverConfig";
import { uiPlugins } from "./uiConfig";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export function getBuildPlugging(
  options: Partial<EchoBundleOptions>
): Plugin[] {
  const rtest = [
    ...initialConfig(options),
    ...productionConfig(options),
    ...babelConfig(extensions),
    ...uiPlugins(options),
    ...serverConfig(options),
  ];
  return merge(
    initialConfig(options),
    productionConfig(options),
    babelConfig(extensions),
    uiPlugins(options),
    serverConfig(options)
  );
}

export function initialConfig(options: Partial<EchoBundleOptions>): Plugin[] {
  return [
    del({ targets: `${options.currentDir}/lib/*`, runOnce: true }),
    nodeResolve({ extensions }),
    workerLoader({
      preserveFileNames: true,
      inline: false,
    }),
    typescript2(),
    commonjs(),
  ];
}

function merge<T>(...args: T[][]): T[] {
  let plugins: T[] = [];
  if (args.length > 0) {
    args.forEach((pluginsItem: T[]) => {
      plugins = plugins.concat(pluginsItem);
    });
  }
  return plugins;
}
