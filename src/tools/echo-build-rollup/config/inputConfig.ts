import { InputOptions } from "rollup";
import { EchoOptions } from "../types/types";

export function getInputOptions({ input }: EchoOptions): InputOptions {
  return {
    input,
  };
}
