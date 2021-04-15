import path from 'path';

interface EchoStartOptions {
    port: number;
    open: boolean;
    type: string;
    production: boolean;
}

export function echoAppDevelopmentStart(initialOptions: EchoStartOptions): void {
    const options = getInitialOptions(initialOptions);
    console.log(options);
}

export function echoPluginDevelopmentStart(initialOptions: EchoStartOptions): void {
    const options = getInitialOptions(initialOptions);
    console.log(options);
}

async function getInitialOptions(initialOptions: EchoStartOptions): Promise<object> {
    const currentDir = process.cwd();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(`${currentDir}/package.json`);

    const options = {
        ...initialOptions,
        isProduction: initialOptions.production ? true : false,
        currentDir: process.cwd(),
        wwwRoot: path.resolve(__dirname, '../../../', 'client'),
        name: pkg.name,
        input: pkg.main
    };

    return options;
    // if (initialOptions.type === 'webpack') {
    //     return options;
    // } else {
    //     return options;
    // }
}
