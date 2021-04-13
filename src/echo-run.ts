#!/usr/bin/env node

import Command, { flags } from '@oclif/command';
import { echoAppDevelopmentStart, echoPluginDevelopmentStart } from './tools/run/start';

export default class StartApp extends Command {
    public static description = 'Start a fusion app';

    public static flags = {
        help: flags.help({ char: 'h' }),
        production: flags.boolean({
            char: 'P',
            description: 'Use production config'
        }),
        port: flags.integer({
            char: 'p',
            description: 'Development server port. default port:3000',
            default: 3000
        }),
        type: flags.string({
            char: 't',
            description: 'Type of bundling configuration, webpack | rollup',
            default: 'webpack',
            options: ['webpack', 'rollup']
        }),
        open: flags.boolean({
            char: 'o',
            default: false
        })
    };

    public async run(): Promise<void> {
        console.log('Starting Echo Development...');
        const options = this.parse(StartApp).flags;
        if (options.type === 'webpack') {
            echoAppDevelopmentStart(options);
        } else {
            echoPluginDevelopmentStart(options);
        }
    }
}

StartApp.run();
