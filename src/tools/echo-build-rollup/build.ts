import { InputOptions, OutputOptions, rollup } from "rollup";

export async function build(
  outputOptions: OutputOptions,
  inputOptions: InputOptions
) {
  const bundle = await rollup(inputOptions);

  console.log(bundle.watchFiles);

  const { output } = await bundle.generate(outputOptions);

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === "asset") {
      console.log("Asset", chunkOrAsset);
    } else {
      console.log("Chunk", chunkOrAsset.modules);
    }
  }

  await bundle.write(outputOptions);
  await bundle.close();
}
