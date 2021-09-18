#!/usr/bin/env node
import Listr from 'listr';
import webpack from 'webpack';
import { copyClientFiles } from '../../config/common/copyFile';
import { createEchoModuleManifest } from '../../config/common/echoManifest';
import { defineInitOptions, EchoBundleOptions, EchoWebpackOptions } from '../../config/common/initOptions';
import { defineWebpackConfig } from '../../config/webpack/config';
import { devServer } from '../../config/webpack/server';

interface CallbackWebpack<T> {
    (err?: Error, stats?: T): void;
}

export async function echoWebpackBuild(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<void> {
    const options = (await defineInitOptions(echoBundleOptions, isDevelopment)) as EchoWebpackOptions;
    const tasks = new Listr([
        {
            task: async (): Promise<void> => {
                options.config = await defineWebpackConfig(options);
            },
            title: 'Generate Webpack Config'
        },
        // {
        //     task: async (): Promise<void> => {
        //         options.https = await defineHttps();
        //     },
        //     title: 'Get SSL Certificate'
        // },
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
        }
    ]);
    await tasks.run();

    try {
        runBuild(options);
    } catch (e: any) {
        if (e.errors) {
            (e.errors as Error[]).forEach((e) => console.log(e.message));
        } else {
            console.log(e);
        }
    }
}

class CompileError extends Error {
    public readonly errors: any[];

    constructor(errors: any[]) {
        super(errors.map((e) => e.message).join('\n'));
        this.errors = errors;
    }
}

async function runBuild(options: EchoWebpackOptions): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        if (options.serve) {
            const compiler = webpack(options.config);
            devServer(compiler, options);
        } else {
            const compiler = webpack(options.config);
            compiler.run((error, stats) => {
                // [Stats Object](#stats-object)
                // ...
                if (error) {
                    console.log('Build failed');
                    console.error('Run Error: ', error);
                    return reject(error);
                }

                if (stats && stats.hasErrors()) {
                    console.log('Build stats failed');
                    return reject(new CompileError(stats.compilation.errors));
                }

                compiler.close(() => {
                    // console.log(
                    //     `Creating ${chalk.cyan('Webpack module')} configuration for ${chalk.green.bold(options.name)}`
                    // );
                    if (options.copy) {
                        copyClientFiles(options);
                    }
                    console.log('Build Done!');

                    // console.log('%s Module ready!', chalk.green.bold('DONE'));
                });
            });
        }
    });
}
