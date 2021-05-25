#!/usr/bin/env node
import chalk from 'chalk';
import * as fs from 'fs';
import Listr from 'listr';
import path from 'path';
import pem from 'pem';
import { OutputOptions, rollup, RollupOptions, watch } from 'rollup';
import { promisify } from 'util';
import { getInputOptions, getOutputOptions } from '../../config/options';
import { createEchoModuleManifest } from './echoManifest';

const access = promisify(fs.access);

export interface EchoBundleOptions {
    watch?: boolean;
    serve?: boolean;
    isProduction: boolean;
    currentDir: string;
    wwwRoot: string;
    main: string;
    source: string;
    inputOptions: RollupOptions;
    outputOptions: OutputOptions;
    peerDependencies: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    requireRef: string;
    name: string;
    https: Https;
}

type Https = {
    key: string;
    cert: string;
    ca: string;
};

async function createHttps(): Promise<Https> {
    return new Promise((resolve, reject) => {
        pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
            if (err) {
                reject(err);
            }

            const https = { key: '', cert: '' } as Https;
            https.key = keys.serviceKey;
            https.cert = keys.certificate;
            https.ca = keys.csr;
            resolve(https);
        });
    });
}

async function echoWatch(options: Partial<EchoBundleOptions>): Promise<void> {
    const WATCH_OPTS = {
        exclude: 'node_modules/**',
        chokidar: true,
        clearScreen: true
    };

    const watchOptions = Object.assign(
        {
            output: options.outputOptions,
            watch: WATCH_OPTS
        },
        options.inputOptions
    );

    new Promise((resolve) => {
        const watcher = watch(watchOptions).on('event', (e) => {
            if (e.code === 'START') {
                console.log('%s Compiling Module', chalk.cyan.bold('START'));
            }
            if (e.code === 'ERROR') {
                console.log(`%s ${JSON.stringify(e)}`, chalk.red.bold('ERROR'));
            }
            if (e.code === 'END') {
                console.log('%s Module ready', chalk.green.bold('DONE'));
            }
        });

        resolve({ watcher });
    });
}

export async function echoBundle(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<void> {
    const options = await getInitOptions(echoBundleOptions, isDevelopment);
    const tasks = new Listr([
        {
            task: async (): Promise<void> => {
                options.https = await createHttps();
            },
            title: 'Get SSL Certificate'
        },
        {
            task: async (): Promise<void> => {
                options.inputOptions = await getInputOptions(options);
            },
            title: 'Generate Input Options'
        },
        {
            task: async (): Promise<void> => {
                options.outputOptions = await getOutputOptions(options);
            },
            title: 'Generate Output Options'
        },
        {
            task: async (): Promise<void> => {
                await createEchoModuleManifest(options.currentDir, options.requireRef);
            },
            title: 'Create Echo Manifest'
        }
    ]);

    console.log(`Creating ${chalk.cyan('module')} configuration for ${chalk.green.bold(options.name)}`);

    await tasks.run();

    try {
        if (options.serve) {
            echoWatch(options);
            return;
        }

        console.log(`%s Compiling Module`, chalk.cyan.bold('START'));
        const bundle = await rollup(options.inputOptions as RollupOptions);
        await bundle.write(options.outputOptions as RollupOptions);
        bundle.close();
    } catch (error) {
        console.log(error);
    }

    console.log('%s Module ready!', chalk.green.bold('DONE'));
}

async function getInitOptions(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<Partial<EchoBundleOptions>> {
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
        peerDependencies: pkj.peerDependencies,
        dependencies: pkj.dependencies,
        devDependencies: pkj.devDependencies,
        wwwRoot: path.resolve(__dirname, '../../../', 'client'),
        requireRef: 'echoDepLoader'
    };
}
