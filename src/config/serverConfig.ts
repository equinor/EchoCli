import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import { EchoBundleOptions } from "../tools/build/build";

export function serverConfig(options: Partial<EchoBundleOptions>): Plugin[] {
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
