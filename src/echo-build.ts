#!/usr/bin/env node

import Command, { flags } from '@oclif/command';
import { EchoModuleConfig } from './config/common/echoModuleConfig';
import { ECHO_MODULE_CONFIG_PATH } from './const/common';
import { echoRollupBuild } from './tools/build/rollupBuild';
import { echoWebpackBuild } from './tools/build/webpackBuilds';
import { getFile } from './utils/getFile';
import { echoCliLogo } from './utils/logo';

export default class CreateBundle extends Command {
    public static description = 'Creates Echo Bundle';

    public static flags = {
        serve: flags.boolean({
            char: 's',
            description: 'Add the serve Echo Client with app'
        }),
        isDevelopment: flags.boolean({
            char: 'd',
            description: 'Production is default, add -d flag for development'
        }),
        adminModule: flags.boolean({
            char: 'a',
            description: 'Add the administration module to the development with the -a flag'
        })
    };

    public async run(): Promise<void> {
        const options = this.parse(CreateBundle);
        const currentDir = process.cwd();
        const echoModuleConfig: EchoModuleConfig = await getFile<EchoModuleConfig>(currentDir, ECHO_MODULE_CONFIG_PATH);
        if (!echoModuleConfig.bundler) {
            console.error('Please define the bundler option i your echoModule.config.json');
        }
        echoCliLogo();

        if (echoModuleConfig.bundler === 'rollup') await echoRollupBuild(options.flags, options.flags.isDevelopment);
        else await echoWebpackBuild(options.flags, options.flags.isDevelopment);
    }
}

CreateBundle.run();
