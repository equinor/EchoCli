#!/usr/bin/env node
import * as figlet from "figlet";
import { OutputOptions, rollup, RollupOptions } from "rollup";

export async function echoBundle(
  inputOptions: RollupOptions,
  outputOptions: OutputOptions
) {
  console.log(
    figlet.textSync("Echo Cli", {
      font: "3D-ASCII",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  );
  try {
    const bundle = await rollup(inputOptions);

    await bundle.write(outputOptions);

    bundle.close();
    console.log("done!!");
  } catch (error) {
    console.log(error);
  }
}
