#!/usr/bin/env node

import Command, { flags } from "@oclif/command";
import * as figlet from "figlet";
import { echoBundle } from "./tools/build/build";

export default class CreateBundle extends Command {
  public static description = "Creates Echo Bundle";

  public static flags = {
    watch: flags.boolean({ char: "w", description: "Add the watch option" }),
    serve: flags.boolean({
      char: "s",
      description: "Add the serve Echo Client with app",
    }),
  };

  public async run() {
    const options = this.parse(CreateBundle);

    console.log(
      figlet.textSync("Echo CLI", {
        font: "3D-ASCII",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    );

    await echoBundle(options.flags);
  }
}

CreateBundle.run();
