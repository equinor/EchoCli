#!/usr/bin/env node
import path from "path";
import { OutputOptions, rollup, RollupOptions } from "rollup";
import { getInputOptions, getOutputOptions } from "../../config/getOptions";

export interface EchoBundleOptions {
  watch?: boolean;
  serve?: boolean;
  currentDir: string;
  wwwRoot: string;
  inputOptions: RollupOptions;
  outputOptions: OutputOptions;
}

export async function echoBundle(
  echoBundleOptions: Partial<EchoBundleOptions>
) {
  const options = getInitOptions(echoBundleOptions);

  options.inputOptions = await getInputOptions(options);
  options.outputOptions = await getOutputOptions(options);

  try {
    const bundle = await rollup(options.inputOptions);
    await bundle.write(options.outputOptions);

    bundle.close();
    console.log("done!!");
  } catch (error) {
    console.log(error);
  }
}

function getInitOptions(
  echoBundleOptions: Partial<EchoBundleOptions>
): Partial<EchoBundleOptions> {
  return {
    ...echoBundleOptions,
    currentDir: process.cwd(),
    wwwRoot: path.resolve(__dirname, "../../../", "client"),
  };
}
