import { watch } from "rollup";
import { watchOptions } from "./config/watchOptions";

const watcher = watch(watchOptions);

watcher.on("event", (event) => {});

watcher.on<any>("event", ({ result }) => {
  if (result) {
    result.close();
  }
});
