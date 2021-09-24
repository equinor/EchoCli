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
    const packageJson = require(`${currentDir}/package.json`);
    if (packageJson) {
        console.log(packageJson);
    }
    const options = {
        ...initialOptions,
        isProduction: initialOptions.production ? true : false,
        currentDir: process.cwd(),
        wwwRoot: path.resolve(__dirname, '../../../', 'client'),
        name: packageJson.name,
        input: packageJson.main
    };

    return options;
}
