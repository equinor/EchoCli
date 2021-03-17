import { OutputOptions, RollupOptions } from "rollup";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";
import livereload from "rollup-plugin-livereload";
import nodeResolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import typescript2 from "rollup-plugin-typescript2";
import workerLoader from "rollup-plugin-web-worker-loader";
import { EchoBundleOptions } from "../tools/build/build";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export async function getInputOptions(
  options: Partial<EchoBundleOptions>
): Promise<RollupOptions> {
  return {
    input: `${options.currentDir}/index.ts`,
    plugins: [
      del({ targets: `${options.currentDir}/lib/*`, runOnce: true }),
      nodeResolve({ extensions }),
      workerLoader({
        preserveFileNames: true,
        inline: false,
      }),
      typescript2(),
      commonjs(),
      cleanup({
        comments: "none",
        extensions: ["js", "ts"],
      }),
      ...getServer(options),
    ],
  };
}

function getServer(options: Partial<EchoBundleOptions>) {
  if (options.serve) {
    return [
      serve({
        contentBase: options.wwwRoot,
        port: 3000,
        verbose: true,
        open: false,
      }),
      livereload({ watch: options.wwwRoot }),
    ];
  }
  return [];
}

export async function getOutputOptions(
  options: Partial<EchoBundleOptions>
): Promise<OutputOptions> {
  return {
    file: `${options.currentDir}/lib/index.js`,
    format: "cjs",
    exports: "auto",
    sourcemap: true,
  };
}
