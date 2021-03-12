import { OutputOptions } from "rollup";
import { EchoOptions } from "../types/types";

export function getOutputOptions(options: EchoOptions): OutputOptions {
  return {
    file: options.output,
    format: "cjs",
    exports: "named",
  };
}
