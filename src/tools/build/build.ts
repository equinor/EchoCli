#!/usr/bin/env node
import path from "path";
import { OutputOptions, rollup, RollupOptions } from "rollup";
import { getInputOptions, getOutputOptions } from "../../config/options";

export interface EchoBundleOptions {
  watch?: boolean;
  serve?: boolean;
  isProduction: boolean;
  currentDir: string;
  wwwRoot: string;
  inputOptions: RollupOptions;
  outputOptions: OutputOptions;
}

export async function echoBundle(
  echoBundleOptions: Partial<EchoBundleOptions>,
  isDevelopment?: boolean
) {
  const options = await getInitOptions(echoBundleOptions, isDevelopment);
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

async function getInitOptions(
  echoBundleOptions: Partial<EchoBundleOptions>,
  isDevelopment?: boolean
): Promise<Partial<EchoBundleOptions>> {
  return {
    ...echoBundleOptions,
    isProduction: isDevelopment ? false : true,
    currentDir: process.cwd(),
    wwwRoot: path.resolve(__dirname, "../../../", "client"),
  };
}
