import path from "path";
import { OutputOptions, RollupOptions } from "rollup";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import del from "rollup-plugin-delete";
import livereload from "rollup-plugin-livereload";
import nodeResolve from "rollup-plugin-node-resolve";
import serve from "rollup-plugin-serve";
import typescript2 from "rollup-plugin-typescript2";
import workerLoader from "rollup-plugin-web-worker-loader";

const currentDir = process.cwd();

const wwwRoot = path.resolve(__dirname, "../../", "client");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export const inputOptions: RollupOptions = {
  input: `${currentDir}/index.ts`,
  plugins: [
    del({ targets: `${currentDir}/lib/*`, runOnce: true }),
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
    serve({
      contentBase: wwwRoot,
      port: 3000,
      verbose: true,
      open: false,
    }),
    livereload({ watch: wwwRoot }),
  ],
};

export const outputOptions: OutputOptions = {
  file: `${currentDir}/lib/index.js`,
  format: "cjs",
  exports: "auto",
  sourcemap: true,
};
