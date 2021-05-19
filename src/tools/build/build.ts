#!/usr/bin/env node
import chalk from 'chalk';
import * as fs from 'fs';
import path from 'path';
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
                console.log('%s Compiling Module!', chalk.cyan.bold('START'));
            }
            if (e.code === 'ERROR') {
                console.log(`%s ${e}`, chalk.red.bold('ERROR'));
            }
            if (e.code === 'END') {
                console.log('%s Module ready!', chalk.green.bold('DONE'));
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

    options.inputOptions = await getInputOptions(options);
    options.outputOptions = await getOutputOptions(options);
    await createEchoModuleManifest(options.currentDir, options.requireRef);

    try {
        if (options.serve) {
            echoWatch(options);
            return;
        }

        console.log(
            `%s Creating ${chalk.cyan('module')} named ${chalk.green.bold(options.name)}`,
            chalk.green.bold('START')
        );
        const bundle = await rollup(options.inputOptions);
        await bundle.write(options.outputOptions);
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
