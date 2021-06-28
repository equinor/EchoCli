#!/usr/bin/env node

import Command, { flags } from '@oclif/command';
import { echoRollupBuild } from './tools/build/rollupBuild';
import { echoWebpackBuild } from './tools/build/webpackBuilds';
import { echoCliLogo } from './utils/logo';

export default class CreateBundle extends Command {
    public static description = 'Creates Echo Bundle';

    public static flags = {
        watch: flags.boolean({ char: 'w', description: 'Add the watch option' }),
        serve: flags.boolean({
            char: 's',
            description: 'Add the serve Echo Client with app'
        }),
        isDevelopment: flags.boolean({
            char: 'd',
            description: 'Production is default, add -d flag for development'
        }),
        type: flags.string({
            char: 't',
            description: 'Type of bundling configuration, webpack | rollup',
            default: 'webpack',
            options: ['webpack', 'rollup']
        })
    };

    public async run(): Promise<void> {
        const options = this.parse(CreateBundle);
        echoCliLogo();
        if (options.flags.type === 'rollup') await echoRollupBuild(options.flags, options.flags.isDevelopment);
        else await echoWebpackBuild(options.flags, options.flags.isDevelopment);
    }
}

CreateBundle.run();
