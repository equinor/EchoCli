export function echoWatch() {
  const currentDir = process.cwd();
  const [, , ...args] = process.argv;

  const pkg = require(`${currentDir}/package.json`);
  console.log(pkg);
}
