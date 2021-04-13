import fs from "fs";
import { InputOptions, OutputOptions } from "rollup";

export default function echoModuleCreator() {
  let fileName = "";
  return {
    name: "echo-moduleCreator",
    async buildStart(options: InputOptions) {
      fileName = options.input!.toString();
    },
    async writeBundle(options: OutputOptions, bundle) {
      const config = {
        match: /\(function\(g\,f\)\{/,
        replace: `(function(g,f){function define(d, f){typeof document !== "undefined" && (document.currentScript.app = {});f(document.currentScript.app, ...d.filter((d) => d !== "exports").map(window.app));}define.amd = !0;`,
      };
      for (const [fileName, chunkOrAsset] of Object.entries(bundle)) {
        if (bundle[fileName]) {
          let data = fs.readFileSync(bundle[fileName], { encoding: "utf8" });
          data = data.replace(config.match, config.replace);
          fs.writeFileSync(options.file ?? fileName, data);
        }
      }
    },
  };
}
