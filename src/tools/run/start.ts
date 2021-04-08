import path from "path";

interface EchoStartOptions {
  port: number;
  open: boolean;
  type: string;
  production: boolean;
}

export function echoAppDevelopmentStart(initialOptions: EchoStartOptions) {
  const options = getInitialOptions(initialOptions);
  console.log(options);
}

export function echoPluginDevelopmentStart(initialOptions: EchoStartOptions) {
  const options = getInitialOptions(initialOptions);
  console.log(options);
}

function getInitialOptions(initialOptions: EchoStartOptions): object {
  const currentDir = process.cwd();
  const pkg = require(`${currentDir}/package.json`);

  const options = {
    ...initialOptions,
    isProduction: initialOptions.production ? true : false,
    currentDir: process.cwd(),
    wwwRoot: path.resolve(__dirname, "../../../", "client"),
    name: pkg.name,
    input: pkg.main,
  };

  if (initialOptions.type === "webpack") {
    return options;
  } else {
    return options;
  }
}
