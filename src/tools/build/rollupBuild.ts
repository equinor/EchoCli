#!/usr/bin/env node
import chalk from 'chalk';
import Listr from 'listr';
import { rollup, RollupOptions, watch } from 'rollup';
import { createEchoModuleManifest } from '../../config/common/echoManifest';
import { defineHttps } from '../../config/common/https';
import { defineInitOptions, EchoBundleOptions, EchoRollupOptions } from '../../config/common/initOptions';
import { defineRollupInputOptions, defineRollupOutputOptions } from '../../config/rollup/options';

async function echoWatch(options: Partial<EchoRollupOptions>): Promise<void> {
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
                console.log(`%s ${e.error.message}`, chalk.red.bold(e.code));
                console.log(e.error.stack);
            }
            if (e.code === 'END') {
                console.log('%s Module ready', chalk.green.bold('DONE'));
            }
        });

        resolve({ watcher });
    });
}

export async function echoRollupBuild(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<void> {
    const options = (await defineInitOptions(echoBundleOptions, isDevelopment)) as EchoRollupOptions;

    const tasks = new Listr([
        {
            task: async (): Promise<void> => {
                options.https = await defineHttps();
            },
            title: 'Get SSL Certificate'
        },
        {
            task: async (): Promise<void> => {
                await createEchoModuleManifest(
                    options.echoModuleConfig,
                    options.currentDir,
                    options.requireRef,
                    options.adminModulePath,
                    options.adminModule
                );
            },
            title: 'Create Echo Manifest'
        },
        {
            task: async (): Promise<void> => {
                options.inputOptions = await defineRollupInputOptions(options);
                options.outputOptions = await defineRollupOutputOptions(options);
            },
            title: 'Generate Options Rollup'
        }
    ]);

    console.log(
        `Creating ${chalk.cyan('module')} configuration for ${chalk.green.bold(options.echoModuleConfig.manifest.name)}`
    );

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
