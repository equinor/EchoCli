import { Plugin } from "rollup";
import cleanup from "rollup-plugin-cleanup";
import { EchoBundleOptions } from "../tools/build/build";

export function productionConfig({
  isProduction,
}: Partial<EchoBundleOptions>): Plugin[] {
  if (isProduction) {
    return [
      cleanup({
        comments: "none",
        extensions: ["js", "ts"],
      }),
    ];
  }
  return [];
}
