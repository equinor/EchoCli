import chalk from 'chalk';
import * as fs from 'fs';
import path, { join } from 'path';
import { OutputOptions, RollupOptions } from 'rollup';
import { promisify } from 'util';
import { Configuration } from 'webpack';
import { Https } from './https';

const access = promisify(fs.access);

export interface EchoRollupOptions extends EchoBundleOptions {
    inputOptions: RollupOptions;
    outputOptions: OutputOptions;
}

export interface EchoWebpackOptions extends EchoBundleOptions {
    config: Configuration;
}

export interface EchoBundleOptions {
    watch?: boolean;
    serve?: boolean;
    isProduction: boolean;
    currentDir: string;
    wwwRoot: string;
    main: string;
    source: string;
    peerDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    requireRef: string;
    name: string;
    https: Https;
    shortName: string;
    envPath: string;
}

function getEnvFilePath(dir: string) {
    return join(dir, './.env');
}

export async function defineInitOptions(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<Partial<EchoWebpackOptions | EchoRollupOptions>> {
    const currentDir = process.cwd();
    const configPath = path.join(currentDir || '', '/package.json');

    try {
        await access(configPath, fs.constants.R_OK);
    } catch (err) {
        if (err instanceof Error) {
            console.error('%s Cant access package.json', chalk.red.bold('ERROR'));
            process.exit(1);
        } else {
            throw err;
        }
    }

    const pkj = JSON.parse(fs.readFileSync(configPath).toString());

    return {
        ...echoBundleOptions,
        isProduction: isDevelopment ? false : true,
        currentDir,
        source: pkj.source,
        main: pkj.main,
        name: pkj.name,
        shortName: pkj.manifest.shortName,
        peerDependencies: pkj.peerDependencies,
        dependencies: pkj.dependencies,
        devDependencies: pkj.devDependencies,
        wwwRoot: path.resolve(__dirname, '../../../', 'client'),
        requireRef: 'echoDepLoader',
        envPath: getEnvFilePath(currentDir)
    };
}
