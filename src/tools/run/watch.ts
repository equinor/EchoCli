export function echoWatch(): void {
    const currentDir = process.cwd();
    const [, , ...args] = process.argv;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(`${currentDir}/package.json`);
    console.log(pkg);
}
