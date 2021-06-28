#!/usr/bin/env node
import chalk from 'chalk';
import Listr from 'listr';
import { Stats, webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { createEchoModuleManifest } from '../../config/common/echoManifest';
import { defineHttps } from '../../config/common/https';
import { defineInitOptions, EchoBundleOptions, EchoWebpackOptions } from '../../config/common/initOptions';
import { defineWebpackConfig } from '../../config/webpack/config';
import { defineDevServer } from '../../config/webpack/configBuilders/devServer';

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
                op;
            },
            title: 'Generate Webpack Config'
        },
        {
            task: async (): Promise<void> => {
                options.https = await defineHttps();
            },
            title: 'Get SSL Certificate'
        },
        {
            task: async (): Promise<void> => {
                await createEchoModuleManifest(options.currentDir, options.requireRef);
            },
            title: 'Create Echo Manifest'
        }
    ]);

    console.log(`Creating ${chalk.cyan('Webpack module')} configuration for ${chalk.green.bold(options.name)}`);

    await tasks.run();

    const callback: CallbackWebpack<Stats> = (err, stats) => {
        if (err || stats?.hasErrors()) {
            // [Handle errors here](#error-handling)
        }
        // Done processing
    };

    try {
        console.log(`%s Compiling Module`, chalk.cyan.bold('START'));
        const compiler = await webpack(options.config, callback);

        if (options.watch) {
            const watching = compiler.watch({}, callback);

            watching.close((error?: Error) => {
                if (error) {
                    console.error(error);
                }
                console.error('Watching Ended.');
            });
        }

        if (options.serve) {
            const server = new WebpackDevServer(compiler, defineDevServer());

            compiler.run((error, stats) => {
                // [Stats Object](#stats-object)
                // ...
                if (error || stats?.hasErrors()) {
                    console.error(error);
                }

                compiler.close((error) => {
                    console.error(error);
                    // ...
                });
            });
        }
    } catch (error) {
        console.log(error);
    }

    console.log('%s Module ready!', chalk.green.bold('DONE'));
}
