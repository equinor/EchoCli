#!/usr/bin/env node
import Listr from 'listr';
import { webpack } from 'webpack';
import { createEchoModuleManifest } from '../../config/common/echoManifest';
import { defineHttps } from '../../config/common/https';
import { defineInitOptions, EchoBundleOptions, EchoWebpackOptions } from '../../config/common/initOptions';
import { defineWebpackConfig } from '../../config/webpack/config';

interface CallbackWebpack<T> {
    (err?: Error, stats?: T): void;
}

export async function echoWebpackBuild(
    echoBundleOptions: Partial<EchoBundleOptions>,
    isDevelopment?: boolean
): Promise<void> {
    const tasks = new Listr([
        {
            task: async (ctx, task): Promise<void> => {
                options.config = await defineWebpackConfig(ctx);
            },
            title: 'Generate Webpack Config'
        },
        {
            task: async (ctx, task): Promise<void> => {
                ctx.https = await defineHttps();
            },
            title: 'Get SSL Certificate'
        },
        {
            task: async (ctx, task): Promise<void> => runBuild(ctx, task),
            title: 'Build'
        },
        {
            task: async (ctx, task): Promise<void> => {
                await createEchoModuleManifest(ctx.currentDir, ctx.requireRef);
            },
            title: 'Create Echo Manifest'
        }
    ]);

    const options = (await defineInitOptions(echoBundleOptions, isDevelopment)) as EchoWebpackOptions;
    try {
        await tasks.run(options);
    } catch (e) {
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

async function runBuild(options: EchoWebpackOptions, task: Listr.ListrTaskWrapper) {
    return new Promise<void>(async (resolve, reject) => {
        task.title = 'Compiling Module';

        const compiler = webpack(options.config);
        if (options.watch) {
            const watching = compiler.watch({}, () => {
                console.log('watch');
            });

            watching.close((error?: Error) => {
                if (error) {
                    console.error(error);
                }
                console.error('Watching Ended.');
            });
        }

        compiler.run((error, stats) => {
            // [Stats Object](#stats-object)
            // ...
            if (error) {
                task.title = 'Build failed';
                console.error('Run Error: ', error);
                return reject(error);
            }

            if (stats && stats.hasErrors()) {
                task.title = 'Build stats failed';
                return reject(new CompileError(stats.compilation.errors));
            }

            compiler.close(() => {
                // console.log(
                //     `Creating ${chalk.cyan('Webpack module')} configuration for ${chalk.green.bold(options.name)}`
                // );
                task.title = 'Build Done!';
                resolve();
                // console.log('%s Module ready!', chalk.green.bold('DONE'));
            });
        });
    });
}
